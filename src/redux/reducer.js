// reducer.js
import { START_UPLOAD, UPLOAD_PROGRESS, UPLOAD_COMPLETE, SET_UPLOAD_RESULT } from './actions'

const initialState = {
  uploading: false,
  progress: 0,
  uploadResult: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_UPLOAD:
      return {
        ...state,
        uploading: true,
      }
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      }
    case UPLOAD_COMPLETE:
      return {
        ...state,
        uploading: false,
        progress: 100,
      }
    case SET_UPLOAD_RESULT:
      return {
        ...state,
        uploadResult: action.payload,
      }
    default:
      return state
  }
}
