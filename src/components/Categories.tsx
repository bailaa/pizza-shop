// import { useState } from "react";
import React from "react";

type CategoriesProps = {
    value: number;
    onClickCategory: (i: number) => void;
}
// компонент FC = FunctionalComponent;
// хранит пропсы, которые хранятся внутри типа
// таким образом типизируются пропсы 
const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        onClick={() => onClickCategory(i)}
                        className={value === i ? 'active' : ''}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;