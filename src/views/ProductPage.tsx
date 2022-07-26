import React, { memo, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPageCarousel from "../components/SingleProductPage/ProductPageCarousel";
import { SingleProduct } from "../types/data";
import Loader from "../components/shared/Loader";
import { useAppDispatch } from "../redux/hooks";
import { addToCart, decrement, increment } from "../redux/slices/order";
import { getDocById } from "../service/generalRequests";

const ProductPage: React.FC = (): JSX.Element => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const [itemsNumber, setItemsNumber] = useState(1);
  const [product, setProduct] = useState<SingleProduct | undefined>(undefined);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    getDocById("products", productId)
      .then((result) => {
        if (!result) return;

        const prod = {
          id: result.id,
          description: result.data()?.description,
          effect: result.data()?.effect,
          name: result.data()?.name,
          photo: result.data()?.photo,
          price: result.data()?.price,
        };

        setProduct(prod);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div className="row px-5 my-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductPageCarousel photos={product?.photo} />

          <div className="col">
            <h2>{product?.name}</h2>
            <h5>{product?.effect}</h5>

            <p className="mb-5">${product?.price}</p>

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
              onClick={() =>
                dispatch(
                  addToCart({
                    id: productId,
                    val: itemsNumber,
                  })
                )
              }
            >
              Add to cart
            </button>

            <p className="mt-5">{product?.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ProductPage);
