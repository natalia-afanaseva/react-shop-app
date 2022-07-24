import React from "react";
import img1 from "../assets/cosm1.webp";

const CartItem: React.FC = () => {
  return (
    <div className="row cart">
      <div className="col">
        <img src={img1} alt="prod" />
      </div>
      <div className="col d-flex flex-column justify-content-between">
        <p>name (6 items)</p>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
