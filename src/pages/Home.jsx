import React from "react";
import axios from "axios";
import qs from "qs";
import { useSearchParams, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Categories, PizzaBlock, SortPopup, Skeleton } from "../components";
import { Pagination } from "../components/Pagination";
import { useRef } from "react";
import {
  setCategoryId,
  setPage,
  setSortProperty,
} from "../redux/slices/filter";

const Home = () => {
  const { categoryId, sortType, page, searchValue } = useSelector(
    (state) => state.filter
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  //ЗАПРОС ПИЦЦ С СЕРВЕРА
  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty;
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://62b7392d491a19c97af0cefe.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc${search}&page=${page}&limit=4`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  //ЕСЛИ ИЗМЕНИЛИ ПАРАМЕТРЫ ПОСЛЕ ПЕРВОГО РЕНДЕРА
  React.useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        categoryId,
        page,
        sortProperty: sortType.sortProperty,
      });
    }

    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, page]);

  //ПРОВЕРЯЕМ ПАРАМЕТРЫ В URL И КИДАЕМ ИХ В REDUX
  React.useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));

      const sort = params.sortProperty;

      const category = params.categoryId;
      const pageNum = params.page;

      dispatch(setCategoryId(category));
      dispatch(setPage(pageNum));
      dispatch(setSortProperty(sort));

      isSearch.current = true;
    }
  }, []);
 // ЗАПРАШИВАЕМ ДАННЫЕ С СЕРВЕРА
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, page]);

  const items = pizzas;
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaItems = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />

        <SortPopup />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? skeleton : pizzaItems}</div>
      <Pagination />
    </div>
  );
};

export default Home;
