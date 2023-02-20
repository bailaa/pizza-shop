import React from "react";
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
// import pizzas from './assets/img/allUneedIsPizza.json'
import { useState, useEffect, useContext } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
/* import list from '../components/Sort';
console.log(list) */


function Home() {
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
    const currPage = useSelector((state) => state.filterSlice.currentPage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchValue } = useContext(SearchContext);

    const onChangeCategoryId = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    /*useEffect(() => {
        if (window.location.search) { // '?sortProperty=rating&categoryId=0&currPage=1'
            const params = qs.parse(window.location.search.substring(1));
            console.log('params', params) // параметры в виде объекта

            const sort = list.find(obj => obj.sortProperty === params.sortProperty);
            console.log('list', list)
            console.log(sort)

            dispatch(
                setFilters({
                    ...params,

                })
            )
        }
    }, []) */

    useEffect(() => {
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

    // парсинг выбранных/изначальных параметров к строке
    //и вшивание их в адресную строчку

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sortType,
            categoryId,
            currPage,
        })

        navigate(`?${queryString}`);
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