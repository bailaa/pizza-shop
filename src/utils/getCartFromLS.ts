import { CartItemBlock } from "../redux/slices/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    // JSON. parse() разбирает строку JSON, 
    // возможно с преобразованием получаемого в процессе разбора значения
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as CartItemBlock[],
        totalPrice
    }
}