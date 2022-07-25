import React, { useState, useEffect, useCallback, memo } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { decrement, removeFromCart, increment } from "../../redux/slices/order";
import { SingleProduct } from "../../types/data";
import { getDocById } from "../../service/generalRequests";
import { CartItemProps } from "../../types/cart";

const CartItem: React.FC<CartItemProps> = ({
  productId,
  number,
  setTotalSum,
}) => {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<SingleProduct | undefined>(undefined);
  const [itemsNumber, setItemsNumber] = useState(number);

  const handleMinus = useCallback(() => {
    setItemsNumber((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
    dispatch(decrement(productId));
  }, [dispatch, productId]);

  const handlePlus = useCallback(() => {
    setItemsNumber((prev) => prev + 1);
    dispatch(increment(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    getDocById("products", productId).then((result: any) => {
      const prod = {
        id: result.id,
        description: result.data().description,
        effect: result.data().effect,
        name: result.data().name,
        photo: result.data().photo,
        price: result.data().price,
      };

      setProduct(prod);
    });
  }, [productId, number, setTotalSum]);

  return (
    <div className="row cart">
      <div className="col">
        <img src={product?.photo[0]} alt={product?.name} />
      </div>
      <div className="col d-flex flex-column justify-content-between">
        <p>
          {product?.name} <span>x {number}</span>
        </p>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <button onClick={handleMinus} className="product-page__btn">
            -
          </button>
          <span className="cart__number">{itemsNumber}</span>
          <button onClick={handlePlus} className="product-page__btn">
            +
          </button>
        </div>

        <button onClick={() => dispatch(removeFromCart(productId))}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
