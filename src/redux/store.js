// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './sagas' // Importa tu rootSaga

const sagaMiddleware = createSagaMiddleware() // Crea el middleware de Saga

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware], // Integra el middleware de Saga
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga) // Ejecuta tus sagas

export default store




