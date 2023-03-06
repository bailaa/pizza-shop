// import { useState } from "react";
import React, { memo } from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
    value: number;
    onClickCategory: (i: number) => void;
}
// компонент FC = FunctionalComponent;
// хранит пропсы, которые хранятся внутри типа
// таким образом типизируются пропсы 
const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
    useWhyDidYouUpdate('Categories', { value, onClickCategory })
    // хук позволяет не делать лишних перерисовок, в случае, если пропс не поменялись
    // memo требуется для того, чтобы остановить перерисовки, в случае если пропс не менялись

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
})

export default Categories;