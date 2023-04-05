import React, { useEffect, useState } from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    updateFilter,
    setView,
    filterProduct,
    loadProduct,
    dispatch,
    sortedProduct,
  } = useFilterContext();

  // console.log(filterProduct);
  useEffect(() => {
    let newFilter = {
      color:
        filterProduct && filterProduct.color === "all"
          ? false
          : filterProduct.color,
      cotegoria:
        filterProduct && filterProduct.cotegoria === "all"
          ? ""
          : filterProduct.cotegoria,
      company:
        filterProduct && filterProduct.company === "all"
          ? ""
          : filterProduct.company,
      inputVal: filterProduct && filterProduct.inputVal,
      price: filterProduct && filterProduct.price,
      shipping: filterProduct && filterProduct.shipping,
    };
    if (loadProduct && !newFilter.shipping) {
      let filterArr = newFilter.color
        ? loadProduct.filter(
            (item) =>
              item.category.includes(newFilter.cotegoria) &&
              item.colors.includes(newFilter.color) &&
              item.company.includes(newFilter.company) &&
              item.name.includes(newFilter.inputVal) &&
              item.price <= newFilter.price
          )
        : loadProduct.filter(
            (item) =>
              item.category.includes(newFilter.cotegoria) &&
              item.company.includes(newFilter.company) &&
              item.name.includes(newFilter.inputVal) &&
              item.price <= newFilter.price
          );

      dispatch({ type: "UPDATE_FILTERS", payload: filterArr });
    } else if (loadProduct) {
      let filterArr = newFilter.color
        ? loadProduct.filter(
            (item) =>
              item.category.includes(newFilter.cotegoria) &&
              item.colors.includes(newFilter.color) &&
              item.company.includes(newFilter.company) &&
              item.shipping &&
              item.name.includes(newFilter.inputVal) &&
              item.price <= newFilter.price
          )
        : loadProduct.filter(
            (item) =>
              item.category.includes(newFilter.cotegoria) &&
              item.company.includes(newFilter.company) &&
              item.name.includes(newFilter.inputVal) &&
              item.shipping &&
              item.price <= newFilter.price
          );
      dispatch({ type: "UPDATE_FILTERS", payload: filterArr });
    }
  }, [filterProduct]);

  console.log(updateFilter);
  useEffect(() => {
    console.log(sortedProduct);
    if (sortedProduct === "name-a") {
      let sortedArr = updateFilter.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      dispatch({ type: "UPDATE_FILTERS", payload: sortedArr });
    }
    if (sortedProduct === "name-z") {
      let sortedArr = updateFilter.sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      });
      dispatch({ type: "UPDATE_FILTERS", payload: sortedArr });
    }
    if (sortedProduct === "price-highest") {
      let sortedArr = updateFilter.sort((a, b) => {
        return b.price - a.price;
      });
      dispatch({ type: "UPDATE_FILTERS", payload: sortedArr });
    }
    if (sortedProduct === "price-lowest") {
      let sortedArr = updateFilter.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch({ type: "UPDATE_FILTERS", payload: sortedArr });
    }
  }, [sortedProduct]);
  return (
    <>
      {setView ? (
        <GridView updateFilter={updateFilter} />
      ) : (
        <ListView updateFilter={updateFilter} />
      )}
    </>
  );
};

export default ProductList;
