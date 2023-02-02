import React from "react";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
// import pizzas from './assets/img/allUneedIsPizza.json'
import { useState, useEffect } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://63da4d42b28a3148f683a56f.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            })
    }, [])

    return (
        <div>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(5)].map((_, i) => <Skeleton key={i} />)
                    : items.map((item) => (
                        <PizzaBlock key={item.id} {...item} />
                    ))}
            </div>
        </div>
    )
}

export default Home;