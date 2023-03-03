import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
import { useEffect } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/FilterSlice';
import { fetchPizzas } from '../redux/slices/PizzasSlice';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
    const sortType = useSelector((state: any) => state.filterSlice.sort.sortProperty);
    const currPage = useSelector((state: any) => state.filterSlice.currentPage);
    const searchValue = useSelector((state: any) => state.filterSlice.searchValue);
    const items = useSelector((state: any) => state.pizzasSlice.items);
    const status = useSelector((state: any) => state.pizzasSlice.status);

    const dispatch = useDispatch();

    const onChangeCategoryId = (id: number) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num))
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sort = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            // @ts-ignore
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
        .map((item: any) => (
            <Link key={item.id} to={`/pizza/${item.id}`}>
                <PizzaBlock key={item.id} {...item} />
            </Link>
        ));

    const skeleton = [...new Array(3)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i: number) => onChangeCategoryId(i)} />
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