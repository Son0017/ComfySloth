import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ getSingleProduct }) => {
  const { dispatch } = useCartContext();
  const [color, setColor] = useState(0);
  const [amount, setAmmount] = useState(1);
  const handleSubmit = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...getSingleProduct, color: color, amount: amount },
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {getSingleProduct.colors &&
            getSingleProduct.colors.map((item, i) => {
              if (i === color) {
                return (
                  <button
                    key={item}
                    className="color-btn active"
                    style={{ background: item }}
                  >
                    <FaCheck />
                  </button>
                );
              } else {
                return (
                  <button
                    key={item}
                    className="color-btn "
                    style={{ background: item }}
                    onClick={() => {
                      setColor(i);
                    }}
                  ></button>
                );
              }
            })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons setAmmount={setAmmount} amount={amount} />
        <button onClick={handleSubmit} className="btn">
          <Link to={"/cart"}>add to cart</Link>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    a {
      color: white;
    }
  }
`;
export default AddToCart;
