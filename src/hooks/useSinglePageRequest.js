import React, { useEffect, useState } from "react";
import { useProductsContext } from "../context/products_context";

function useSinglePageRequest() {
  const { dispatch } = useProductsContext();
  useEffect(() => {
    dispatch({ type: "GET_SINGLE_PRODUCT_ERROR", payload: null });
  }, []);

  const request = async (id) => {
    try {
      dispatch({ type: "GET_SINGLE_PRODUCT_BEGIN" });
      const responce = await fetch(
        `https://course-api.com/react-store-single-product?id=${id}`
      );
      const data = await responce.json();
      dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "GET_SINGLE_PRODUCT_ERROR", payload: err });
    }
  };

  return { request };
}

export default useSinglePageRequest;
