import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './FilterSlice';

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currPage: string;
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus',
    async (params) => {
        const { currPage, category, sort, order, search } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63da4d42b28a3148f683a56f.mockapi.io/items?page=${currPage}&limit=3&${category}&sortBy=${sort}&order=${order}${search}`
        )
        return data;
    })

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
        /* findItem (state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
        } */
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    }
})

// export const selectPizzaData = (state: RootState) => state.pizzaSlice;

export const { setItems /* , findItem */ } = pizzasSlice.actions

export default pizzasSlice.reducer