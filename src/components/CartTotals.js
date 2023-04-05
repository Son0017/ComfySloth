import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CartTotals = () => {
  const { dispatch, total, cardItems } = useCartContext();

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
  }, [cardItems]);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :<span>${total / 100}</span>
          </h5>
          <p>
            shipping fee :<span>$5.34</span>
          </p>
          <hr />
          <h4>
            order total :<span>${(total - 534) / 100}</span>
          </h4>
        </article>
        <a className="btn" href="/checkout">
          proceed to checkout
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
