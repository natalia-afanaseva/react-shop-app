import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/order";

const SingleProductCard: React.FC<{
  id?: string;
  imageMain?: string;
  imageFallback?: string;
  price?: string;
  effect?: string;
  name?: string;
}> = ({ id, imageMain, imageFallback, price, effect, name }) => {
  const [toggleImage, setToggleImage] = useState(imageMain);

  const dispatch = useAppDispatch();

  return (
    <div className="product-card col-12 col-md-6 col-lg-4 col-xl-3">
      <Link to={`/product/${id}`}>
        <img
          src={toggleImage}
          alt="product"
          onMouseEnter={() => setToggleImage(imageFallback)}
          onMouseLeave={() => setToggleImage(imageMain)}
        />
      </Link>
      <div className="product-description">
        <h5>{name}</h5>
        <h6>{effect}</h6>
        <p>${price}</p>
        <button
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          onClick={() =>
            dispatch(
              addToCart({
                id,
                val: 1,
              })
            )
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default memo(SingleProductCard);
