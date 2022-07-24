import React, { memo, useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CartItem from "./CartItem";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { emptyCart } from "../../redux/slices/order";

const CartOffcanvas: React.FC = () => {
  const totalItemsNumber = useAppSelector(
    (state) => state.order.totalItemsNumber
  );
  const products = useAppSelector((state) => state.order.products);
  const isEmpty = useAppSelector((state) => state.order.isEmpty);
  const currentUserUid = useAppSelector((state) => state.auth.currentUserUid);

  const dispatch = useAppDispatch();

  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalSum(0);
    Object.entries(products).forEach(([productId, number]) => {
      getDoc(doc(db, `products/${productId}`)).then((doc) =>
        setTotalSum((prev) => {
          prev += doc.data()?.price * number ?? 0;
          return prev;
        })
      );
    });
  }, [products]);

  const handleCheckout = useCallback(async () => {
    if (!currentUserUid) return; // show error
    setLoading(true);

    await addDoc(collection(db, `users/${currentUserUid}/orders`), {
      status: "pending",
      products,
      created: serverTimestamp(),
      totalSum,
    });
    setLoading(false);
    dispatch(emptyCart());
  }, [currentUserUid, products, totalSum, dispatch]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Shopping cart{" "}
          <span className="fs-6">
            {totalItemsNumber} item{totalItemsNumber > 1 ? "s" : ""}
          </span>
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        {isEmpty ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {Object.entries(products).map(([productId, number]) => (
              <CartItem
                key={productId}
                productId={productId}
                number={number}
                setTotalSum={setTotalSum}
              />
            ))}
          </>
        )}
      </div>

      <div className="offcanvas-footer">
        <p>Total sum: ${totalSum}</p>
        <button onClick={handleCheckout} disabled={loading}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default memo(CartOffcanvas);
