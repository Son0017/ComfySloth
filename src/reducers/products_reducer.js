import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, sidebar: true };
    case SIDEBAR_CLOSE:
      return { ...state, sidebar: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, productIsPending: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, getProduct: action.payload, productIsPending: false };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        getProductError: action.payload,
        productIsPending: false,
      };
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, singleProductIsPending: true };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        getSingleProduct: action.payload,
        singleProductIsPending: false,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        getSingleProduct: action.payload,
        singleProductIsPending: false,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        getSingleProductError: action.payload,
        singleProductIsPending: false,
      };
    default:
      return { ...state };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
