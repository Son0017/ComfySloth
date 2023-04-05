import React, { useEffect } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  const { cardItems } = useCartContext();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cardItems));
  }, [cardItems]);
  return (
    <>
      {cardItems && cardItems.length > 0 ? (
        <Wrapper className="page">
          <PageHero title={"card"} />
          <CartContent cardItems={cardItems} />
        </Wrapper>
      ) : (
        <Wrapper className="page-100">
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link className="btn" to={"/products"}>
              fill it
            </Link>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
