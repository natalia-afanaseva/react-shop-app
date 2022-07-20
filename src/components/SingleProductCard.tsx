import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/cosm1.webp";

const SingleProductCard = () => {
  return (
    <div className="product-card col-12 col-md-6 col-lg-4 col-xl-3">
      <Link to={`/product/1`}>
        <img src={img} alt="product" />
      </Link>
      <div className="product-description">
        <h5>MINI CLARIFYING SERUM</h5>
        <h6>Balance + Smooth</h6>
        <p>$22.99</p>
        <div>stars</div>
        <button type="button">Add to cart</button>
      </div>
    </div>
  );
};

export default SingleProductCard;
