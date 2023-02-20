import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/FilterSlice'
// import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';

export const store = configureStore({
    reducer: { filterSlice },
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
})