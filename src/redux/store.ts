import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/FilterSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/PizzasSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
    reducer: { filterSlice, cartSlice, pizzasSlice },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()