import React from "react";
import CartItem from "./CartItem";

const CartOffcanvas: React.FC = () => {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Shopping cart <span className="fs-6">6 items</span>
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <CartItem />
      </div>
      <div className="offcanvas-footer">
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CartOffcanvas;
