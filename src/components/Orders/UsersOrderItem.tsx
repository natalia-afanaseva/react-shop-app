import React, { useState, useEffect, memo } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { SingleProduct } from "../../types/data";

const UsersOrderItem: React.FC<{
  productId?: string;
  number?: number;
}> = ({ productId, number }) => {
  const [product, setProduct] = useState<SingleProduct | undefined>(undefined);

  useEffect(() => {
    getDoc(doc(db, `products/${productId}`)).then((result) => {
      if (!result.exists) {
        return;
      }

      const prod = {
        id: result.id,
        description: result.data()?.description,
        effect: result.data()?.effect,
        name: result.data()?.name,
        photo: result.data()?.photo,
        price: result.data()?.price,
      };

      setProduct(prod);
    });
  }, [productId]);

  return (
    <div className="row mb-5">
      <div className="col">
        <img alt={product?.name} src={product?.photo[0]} />
      </div>
      <div className="col">
        <h5>
          {product?.name} <span>x {number}</span>
        </h5>
      </div>
    </div>
  );
};

export default memo(UsersOrderItem);
