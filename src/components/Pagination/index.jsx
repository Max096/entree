import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/filter";

import styles from "./Pagination.module.scss";

export const Pagination = () => {
  
  const dispatch = useDispatch();
  const {page} = useSelector(state => state.filter);
  const onChangePage = (event) => {
    dispatch(setPage(event.selected + 1));
  }

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onChangePage}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
};
