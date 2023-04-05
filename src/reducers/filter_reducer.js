import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case SET_GRIDVIEW:
      return { ...state, setView: true };
    case SET_LISTVIEW:
      return { ...state, setView: false };
    case LOAD_PRODUCTS:
      return {
        ...state,
        loadProduct: action.payload,
      };
    case FILTER_PRODUCTS:
      return { ...state, filterProduct: action.payload };
    case UPDATE_FILTERS:
      return { ...state, updateFilter: action.payload };
    case SORT_PRODUCTS:
      return { ...state, sortedProduct: action.payload };
    case UPDATE_SORT:
      return { ...state, updateSorted: action.payload };
    case CLEAR_FILTERS:
      return {
        ...state,
        filterProduct: {
          color: "all",
          cotegoria: "all",
          company: "all",
          inputVal: "",
          shipping: false,
          price: 309999,
        },
      };
    default:
      return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
