import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/FilterSlice'
import cartSlice from './slices/cartSlice'


export const store = configureStore({
    reducer: { filterSlice, cartSlice },
})