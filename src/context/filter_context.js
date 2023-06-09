import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  loadProduct: null,
  setView: true,
  filterProduct: {
    color: "all",
    cotegoria: "all",
    company: "all",
    inputVal: "",
    shipping: false,
    price: 309999,
  },
  updateFilter: null,
  sortedProduct: null,
  updateSorted: null,
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { getProduct } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_PRODUCTS", payload: getProduct });
  }, [getProduct]);

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
