import React, { useEffect, useState } from "react";
import { useProductsContext } from "../context/products_context";
function useRequest() {
  const { dispatch } = useProductsContext();
  const request = async () => {
    try {
      dispatch({ type: "GET_PRODUCTS_BEGIN" });
      const responce = await fetch(
        "https://course-api.com/react-store-products"
      );
      const data = await responce.json();

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "GET_PRODUCTS_ERROR", payload: err });
    }
  };

  useEffect(() => {
    request();
  }, []);
}

export default useRequest;
