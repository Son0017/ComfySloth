import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProductImages = ({ getSingleProduct }) => {
  const [imageMain, setMainImage] = useState();
  useEffect(() => {
    setMainImage(getSingleProduct["images"][0]);
  }, [getSingleProduct]);

  return (
    <Wrapper>
      <img src={imageMain && imageMain.url} alt="" className="main " />
      <div className="gallery">
        {getSingleProduct.images &&
          getSingleProduct.images.map((item) => {
            return (
              <img
                src={item.url}
                alt=""
                key={item.id}
                className={
                  imageMain && imageMain.id === item.id ? "active" : "null"
                }
                onClick={() => {
                  setMainImage(item);
                }}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
