import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/FilterSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/PizzasSlice'


export const store = configureStore({
    reducer: { filterSlice, cartSlice, pizzasSlice },
})