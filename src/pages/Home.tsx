import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/Pizzablock/PizzaBlock';
import { useCallback, useEffect } from 'react';
import Skeleton from '../components/Pizzablock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home: React.FC = () => {
    const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
    const sortType = useSelector((state: any) => state.filterSlice.sort.sortProperty);
    const currPage = useSelector((state: any) => state.filterSlice.currentPage);
    const searchValue = useSelector((state: any) => state.filterSlice.searchValue);
    const items = useSelector((state: any) => state.pizzasSlice.items);
    const status = useSelector((state: any) => state.pizzasSlice.status);

    const dispatch = useAppDispatch();
    // компонент не перерисовывается, ф-я создаетсЯ только при первом рендере,
    // а не каждый раз при перерисовке, если пропс не изменились 
    const onChangeCategoryId = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (num: number) => {
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
                currPage: String(currPage),
            })
        )
        window.scrollTo(0, 0);
    };

    // Если изменили параметры и был первый рендер
    /* 
    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage,
            }

            const queryString = qs.stringify(params, {  skipNulls: true});
            navigate(`/?${queryString}`);
        }

        if (!window.location.search) {
            console.log(111);
            dispatch(fetchPizzas({} as SearchPizzaParams));
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    */

    useEffect(() => {
        getPizzas();
    }, [categoryId, sortType, searchValue, currPage])

    // Парсим параметры при первом рендере
    // React.useEffect(() => {
    //   if (window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
    //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
    //     dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId: Number(params.category),
    //         currentPage: Number(params.currentPage),
    //         sort: sort || sortList[0],
    //       }),
    //     );
    //   }
    //   isMounted.current = true;
    // }, []);

    const pizzas = items
        .map((item: any) => (
            // <Link key={item.id} to={`/pizza/${item.id}`}>
            <PizzaBlock key={item.id} {...item} />
            // </Link>
        ));

    const skeleton = [...new Array(3)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i: number) => onChangeCategoryId(i)} />
                <Sort value={sortType} />
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