// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import uploadReducer from "./reducer"; // Este es el reducer que ya tienes

const rootReducer = combineReducers({
  upload: uploadReducer,
  // Aquí puedes agregar más reducers a medida que los crees
});

export default rootReducer;
