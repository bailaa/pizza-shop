import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ({ currPage, category, sort, order, search }) => {
    const res = await axios.get(
        `https://63da4d42b28a3148f683a56f.mockapi.io/items?page=${currPage}&limit=3&${category}&sortBy=${sort}&order=${order}${search}`
    )
    return res.data;
})

const initialState = {
    items: [],
    status: 'loading',
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        /* findItem (state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
        } */
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    }
})

export const { setItems /* , findItem */ } = pizzasSlice.actions

export default pizzasSlice.reducer