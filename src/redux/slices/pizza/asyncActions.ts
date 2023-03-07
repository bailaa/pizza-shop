import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus',
    async (params) => {
        const { currPage, category, sort, order, search } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63da4d42b28a3148f683a56f.mockapi.io/items?page=${currPage}&limit=3&${category}&sortBy=${sort}&order=${order}${search}`
        )
        return data;
    })