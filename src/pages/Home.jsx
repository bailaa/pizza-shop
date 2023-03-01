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
import { fetchPizzas } from '../redux/slices/PizzasSlice';
import { Link } from 'react-router-dom';

function Home() {
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
    const currPage = useSelector((state) => state.filterSlice.currentPage);

    const items = useSelector((state) => state.pizzasSlice.items);
    const status = useSelector((state) => state.pizzasSlice.status);

    const dispatch = useDispatch();
    const { searchValue } = useContext(SearchContext);

    const onChangeCategoryId = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sort = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sort,
                order,
                category,
                search,
                currPage,
            })
        )
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getPizzas();
    }, [categoryId, sortType, searchValue, currPage])

    const pizzas = items
        .map((item) => (
            <Link key={item.id} to={`/pizza/${item.id}`}>
                <PizzaBlock key={item.id} {...item} />
            </Link>
        ));
    console.log(pizzas, 'pizzas')

    const skeleton = [...new Array(3)].map((_, i) => <Skeleton key={i} />);
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => onChangeCategoryId(i)} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
            )}
            <Pagination currPage={currPage} onChangePage={onChangePage} />
        </div>
    )
}
export default Home;