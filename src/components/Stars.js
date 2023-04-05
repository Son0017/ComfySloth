import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ getSingleProduct }) => {
  // console.log(getSingleProduct);
  let filstart = [];

  if (getSingleProduct) {
    let x = getSingleProduct.stars;
    for (let index = 1; index < 6; index++) {
      if (x >= 1) {
        filstart.push(1);
        x--;
      } else if (x < 1 && x > 0) {
        filstart.push(0.5);
        x--;
      } else if (x < 0) {
        filstart.push(0);
        x--;
      }
    }
  }

  return (
    <Wrapper>
      <div className="stars">
        <span>
          {filstart.map((item) => {
            if (item === 1) {
              return <BsStarFill key={Math.random()} />;
            } else if (item === 0) {
              return <BsStar key={Math.random()} />;
            } else {
              return <BsStarHalf key={Math.random()} />;
            }
          })}
        </span>
        <p className="reviews">({getSingleProduct.reviews})</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
