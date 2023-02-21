import React from "react";
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
import { useState, useEffect, useContext } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/FilterSlice';

function Home() {
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
    const currPage = useSelector((state) => state.filterSlice.currentPage);

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchValue } = useContext(SearchContext);

    const onChangeCategoryId = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    useEffect(() => {
        // debugger
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sort = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(
            `https://63da4d42b28a3148f683a56f.mockapi.io/items?page=${currPage}&limit=3&${category}&sortBy=${sort}&order=${order}${search}`
        )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            })
        // window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currPage])

    const pizzas = items
        .map((item) => (
            <PizzaBlock key={item.id} {...item} />
        ));
    const skeleton = [...new Array(3)].map((_, i) => <Skeleton key={i} />);
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => onChangeCategoryId(i)} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeleton
                    : pizzas}
            </div>
            <Pagination currPage={currPage} onChangePage={onChangePage} />
        </div>
    )
}
export default Home;