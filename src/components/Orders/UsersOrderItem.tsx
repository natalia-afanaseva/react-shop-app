import React, { useState, useEffect, memo } from "react";
import { SingleProduct } from "../../types/data";
import { getDocById } from "../../service/generalRequests";
import { UsersOrderItemProps } from "../../types/orders";

const UsersOrderItem: React.FC<UsersOrderItemProps> = ({
  productId,
  number,
}) => {
  const [product, setProduct] = useState<SingleProduct | undefined>(undefined);

  useEffect(() => {
    getDocById("products", productId).then((result: any) => {
      if (!result) return;
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
