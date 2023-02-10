import React from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
// import pizzas from './assets/img/allUneedIsPizza.json'
import { useState, useEffect, useContext } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useContext(SearchContext);
    const [sortType, setSortType] = useState({
        name: 'популярности', sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sort = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
            `https://63da4d42b28a3148f683a56f.mockapi.io/items?page=${currentPage}&limit=3&${category}&sortBy=${sort}&order=${order}${search}`
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items
        .map((item) => (
            <PizzaBlock key={item.id} {...item} />
        ));

    const skeleton = [...new Array(5)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeleton
                    : pizzas}
            </div>
            <Pagination onChangePage={((number) => setCurrentPage(number))} />
        </div>
    )
}

export default Home;