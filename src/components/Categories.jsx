import React from "react";
import {setCategoryId} from '../redux/slices/filter';
import {useSelector, useDispatch} from 'react-redux';

const Categories = () => {
  const categories = [
    "Все",
    "Вегетарианская",
    "Мясные",
    "Острые",
    "Гриль",
    "Закрытые",
  ];
  const dispatch = useDispatch();

  const {categoryId} = useSelector((state) => state.filter);
  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            className={categoryId === i ? "active" : ""}
            onClick={() => onChangeCategory(i)}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
 export default Categories;