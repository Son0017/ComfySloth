import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

import useSinglePageRequest from "../hooks/useSinglePageRequest";

const SingleProductPage = () => {
  const { getSingleProduct, getSingleProductError, singleProductIsPending } =
    useProductsContext();
  const { id } = useParams();
  const { request } = useSinglePageRequest();
  useEffect(() => {
    request(id);
  }, [id]);

  return (
    <>
      {singleProductIsPending && <Loading />}
      {!singleProductIsPending && getSingleProduct && (
        <Wrapper>
          <PageHero title={"product"} product={getSingleProduct} />
          <section className="section section-center page">
            <Link className="btn" to={"/products"}>
              back to products
            </Link>
            <div className="product-center">
              <ProductImages getSingleProduct={getSingleProduct} />
              <section className="content">
                <h2>{getSingleProduct.name}</h2>
                <Stars getSingleProduct={getSingleProduct} />
                <h5 className="price">{getSingleProduct.price}</h5>
                <p className="desc">{getSingleProduct.description}</p>
                <p className="info">
                  <span>Available : </span>
                  {getSingleProduct.stock ? "in Stock" : "Not Stock"}
                </p>
                <p className="info">
                  <span>SKU :</span>
                  {getSingleProduct.id}
                </p>
                <p className="info">
                  <span>Brand :</span>
                  {getSingleProduct.company}
                </p>
                <hr />
                <AddToCart getSingleProduct={getSingleProduct} />
              </section>
            </div>
          </section>
        </Wrapper>
      )}
      {getSingleProductError && <Error />}
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
