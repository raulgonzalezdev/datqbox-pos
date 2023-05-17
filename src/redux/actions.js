// actions.js
export const START_UPLOAD = "START_UPLOAD";
export const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
export const UPLOAD_COMPLETE = "UPLOAD_COMPLETE";
export const SET_UPLOAD_RESULT = "SET_UPLOAD_RESULT";

export const startUpload = (files) => ({
  type: START_UPLOAD,
  payload: files,
});

export const updateUploadProgress = (progress) => ({
  type: UPLOAD_PROGRESS,
  payload: progress,
});

export const completeUpload = () => ({
  type: UPLOAD_COMPLETE,
});

export const setUploadResult = (uploadResult) => ({
  type: SET_UPLOAD_RESULT,
  payload: uploadResult,
});

export const getUploadResult = (state) => state.upload.uploadResult;