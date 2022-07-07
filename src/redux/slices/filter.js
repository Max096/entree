import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortType: { name: "популярности", sortProperty: "popular" },
  page: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortProperty(state, action) {
      state.sortType.sortProperty = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setPage,
  setSearchValue,
  setSortProperty,
} = filterSlice.actions;

export default filterSlice.reducer;
