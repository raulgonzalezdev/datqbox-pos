// sagas.js
import { takeEvery, call, put, take  } from 'redux-saga/effects' // Asegúrate de importar END
import { client } from 'graphql/client'
import { gql } from '@apollo/client'
import { eventChannel, END } from 'redux-saga'
import {
  START_UPLOAD,
  updateUploadProgress,
  completeUpload,
  setUploadResult,
} from './actions'

const UPLOAD_FILES = gql`
  mutation ($files: [Upload!]!) {
    multipleUpload(files: $files) {
      filename
    }
  }
`

function createUploader(files) {
  return eventChannel((emit) => {
    client
      .mutate({
        mutation: UPLOAD_FILES,
        variables: {
          files,
        },
        context: {
          fetchOptions: {
            onUploadProgress: (progressEvent) => {
              let progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              )
              emit(updateUploadProgress(progress))
            },
          },
        },
      })
      .then((result) => {
        emit(completeUpload())
        emit(setUploadResult(result.data.multipleUpload))
        emit(END)
      })
      .catch((error) => {
        console.error(error)
        // Puedes manejar los errores aquí
      })

    return () => {}
  })
}

function* uploadFilesSaga(action) {
  const files = action.payload
  const channel = yield call(createUploader, files)

  try {
    while (true) {
      const action = yield take(channel)
      yield put(action)
    }
  } finally {
    channel.close()
  }
}

export default function* rootSaga() {
  yield takeEvery(START_UPLOAD, uploadFilesSaga)
}
