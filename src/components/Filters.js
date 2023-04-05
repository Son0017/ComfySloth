import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

function getElelment(loadProduct, elem) {
  let myArray = ["all"];
  loadProduct.map((item) => {
    if (!myArray.includes(item[elem])) {
      myArray.push(item[elem]);
    }
  });
  return myArray;
}
function getElelmentColor(loadProduct) {
  let myArray = [];
  loadProduct.map((item) => {
    item["colors"] &&
      item["colors"].map((item) => {
        if (!myArray.includes(item)) {
          myArray.push(item);
        }
      });
  });
  return myArray;
}
const Filters = () => {
  const { loadProduct, dispatch, filterProduct } = useFilterContext();
  const cotegoria = loadProduct && getElelment(loadProduct, "category");
  const company = loadProduct && getElelment(loadProduct, "company");
  const color = loadProduct && getElelmentColor(loadProduct);
  // const [price, setPrice] = useState(309999);
  const [filterChange, setFilterChange] = useState({
    ...filterProduct,
  });

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS", payload: filterChange });
  }, [filterChange]);

  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              onChange={(e) => {
                setFilterChange({ ...filterChange, inputVal: e.target.value });
              }}
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            <div>
              {cotegoria &&
                cotegoria.map((item) => {
                  return (
                    <button
                      type="button"
                      name="category"
                      className={
                        item === filterChange.cotegoria ? "active" : "null"
                      }
                      key={item}
                      onClick={() => {
                        setFilterChange({ ...filterChange, cotegoria: item });
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              className="company"
              onChange={(e) => {
                setFilterChange({ ...filterChange, company: e.target.value });
              }}
            >
              {company &&
                company.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              <button
                name="color"
                data-color="all"
                className={
                  filterChange.color === "all" ? "all-btn active" : "all-btn"
                }
                onClick={() => {
                  setFilterChange({ ...filterChange, color: "all" });
                }}
              >
                all
              </button>
              {color &&
                color.map((item) => {
                  return (
                    <button
                      name="color"
                      className="color-btn"
                      data-color={item}
                      style={{ background: item }}
                      key={item}
                      onClick={() => {
                        setFilterChange({ ...filterChange, color: item });
                      }}
                    >
                      {filterChange.color === item && <FaCheck />}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="form-control">
            x<h5>price</h5>
            <p className="price">${filterChange.price / 100}</p>
            <input
              type="range"
              name="price"
              onChange={(e) => {
                setFilterChange({ ...filterChange, price: e.target.value });
              }}
              min={0}
              max={309999}
              value={filterChange.price}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onClick={() => {
                setFilterChange({
                  ...filterProduct,
                  shipping: !filterProduct.shipping,
                });
              }}
            />
          </div>
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            setFilterChange({
              color: "all",
              cotegoria: "all",
              company: "all",
              inputVal: "",
              shipping: false,
              price: 309999,
            });
          }}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
