import React, { useState, memo } from "react";
import { Link } from "react-router-dom";

const SingleProductCard: React.FC<{
  id?: string;
  imageMain?: string;
  imageFallback?: string;
  price?: string;
  effect?: string;
  name?: string;
}> = ({ id, imageMain, imageFallback, price, effect, name }) => {
  const [toggleImage, setToggleImage] = useState(imageMain);

  console.log(id);

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
        <div>stars</div>
        <button type="button">Add to cart</button>
      </div>
    </div>
  );
};

export default memo(SingleProductCard);
