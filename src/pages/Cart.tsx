import React from "react";
import styles from './Cart.module.scss'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearItems } from "../redux/slices/cartSlice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: any) => state.cartSlice.items);
    const totalPrice = useSelector((state: any) => state.cartSlice.totalPrice);
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
    // const totalCount = useSelector((state) => state.cartSlice.totalCount);

    const onClickClear = () => {
        if (window.confirm('Очистить корзину?')) {
            dispatch(
                clearItems()
            )
        };
    }

    if (!totalPrice) {
        return <CartEmpty />
    }

    return (
        <div className={styles.root}>
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <svg width="18" height="18" viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg" />
                        <path d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.6666"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        Корзина
                    </h2>
                    <img src="https://cdn-icons-png.flaticon.com/512/3081/3081797.png" alt="image_cart" width={100} />

                    <div onClick={onClickClear} className="cart_clear">
                        <svg width="20" height="20" viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg" />
                        <path d="M2.5 5H4.16667H17.5"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                        </path>
                        <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                        </path>
                        <path
                            d="M8.33337 9.16667V14.1667"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                        </path>
                        <path
                            d="M11.66669.16667BV14.1667"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"


                        >
                        </path>
                        <span>Очистить корзину</span>
                    </div>
                </div>

                <div className="content__items2">
                    {
                        items.map((item: any) => <CartItem key={item.id} {...item} />)
                    }
                </div>
                <div>

                    <div className="cart__bottom">
                        <div className="cart__bottom-details">
                            <span> Всего пицц: <b> {totalCount} шт. </b> </span>
                            <span> Сумма заказа: <b> {totalPrice} р. </b> </span>
                        </div>
                        <div className="cart__bottom-buttons">
                            <Link to="/" className="button button--outline button--add go-back-btn" >
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="" />
                                <path d="M& 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" />
                                <span>Вернуться назад</span>
                            </Link>
                            <div className="button pay-btn">
                                <span> Оплатить сейчас </span>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}
export default Cart;