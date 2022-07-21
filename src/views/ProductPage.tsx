import React, { memo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductPageCarousel from "../components/ProductPageCarousel";

const ProductPage: React.FC = (): JSX.Element => {
  const params = useParams();

  const [itemsNumber, setItemsNumber] = useState(1);

  const handleMinus = useCallback(() => {
    setItemsNumber((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  }, []);

  const handlePlus = useCallback(() => {
    setItemsNumber((prev) => prev + 1);
  }, []);

  return (
    <div className="row px-5 my-5">
      <ProductPageCarousel />

      <div className="col">
        <h2>Name</h2>
        <h5>Effect</h5>

        <p className="mb-5">$23</p>

        <button onClick={handleMinus} className="product-page__btn">
          -
        </button>
        <span>{itemsNumber}</span>
        <button onClick={handlePlus} className="product-page__btn">
          +
        </button>

        <button
          className="mt-5"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Add to cart
        </button>

        <p className="mt-5">
          description... Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Velit ratione aperiam officia aut quis sequi enim porro
          consequatur doloremque optio laboriosam adipisci delectus soluta
          autem, voluptate vero assumenda eos error.
        </p>
      </div>
    </div>
  );
};

export default memo(ProductPage);
