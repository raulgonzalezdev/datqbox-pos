// sagas.js
import { takeEvery, call, put } from "redux-saga/effects";
import { client } from "graphql/client";
import { gql } from "@apollo/client";
import { START_UPLOAD, updateUploadProgress, completeUpload } from "./actions";

const UPLOAD_FILES = gql`
  mutation ($files: [Upload!]!) {
    multipleUpload(files: $files) {
      filename
    }
  }
`;

function* uploadFilesSaga(action) {
  const files = action.payload;
  try {
    const result = yield call(client.mutate, {
      mutation: UPLOAD_FILES,
      variables: {
        files,
      },
      context: {
        fetchOptions: {
          onUploadProgress: (progressEvent) => {
            let progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            put(updateUploadProgress(progress));
          },
        },
      },
    });

    console.log(result.data.multipleUpload); // Información sobre los archivos subidos
    yield put(completeUpload());
  } catch (error) {
    console.error(error);
    // Puedes manejar los errores aquí, por ejemplo, disparando una acción ERROR
  }
}

export default function* rootSaga() {
  yield takeEvery(START_UPLOAD, uploadFilesSaga);
}
