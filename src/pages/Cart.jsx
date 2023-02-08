import React from "react";
import styles from './Cart.module.scss'
import { Link } from "react-router-dom";

const Cart = () => {
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
                    <div className="cart_clear">
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
                        ></path>

                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div class="content__items">
                    <div className="cart__item">
                        <div className="cart__item-img">
                            <img
                                className="pizza-block__image"
                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/42360a7dcb7640c998b723231586fe84_760x760.webp"
                                alt="Pizza" />
                        </div>
                        <div className="cart__item-info">
                            <h3>Сырный цыплёнок</h3>
                            <p>тонкое тесто, 26 см.</p>
                        </div>
                        <div className="cart__item-count">
                            <div className="button button--outline button--circle cart__item-count">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                />
                                <path
                                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 9.6.4.96001"
                                    fill="orange"
                                >
                                </path>
                                <path
                                    d="M5.75998 5.92001L3.83998 5.92001LO.959977 5.92001C0.429817"
                                    fill="orange"
                                >
                                </path>
                            </div>
                            <b>2</b>
                            <div className="button button--outline button--circle cart__item-count-plus">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                />
                                <path
                                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6.4.96001"
                                >
                                </path>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="cart__bottom-details">


                        <span> Всего пицц: <b> 3 шт. </b> </span>
                        <span> Сумма заказа: <b> 900 р. </b> </span>
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
                </div >
            </div>
        </div>
    )
}

export default Cart;