import React, { memo, useMemo } from "react";
import { SingleOrder } from "../../types/SingleOrder";
import UsersOrderItem from "./UsersOrderItem";

const UsersOrderWrapper: React.FC<SingleOrder> = ({
  products,
  totalSum,
  status,
  id,
  created,
}) => {
  const creationDate = useMemo(() => {
    const timestampToDate = created.toDate();
    const date = `${timestampToDate.getDate()} ${
      timestampToDate.getMonth() + 1
    }, ${timestampToDate.getFullYear()}`;
    return date;
  }, [created]);

  return (
    <div className="order">
      <h4>
        Order #{id}, created on {creationDate}
      </h4>
      {Object.entries(products).map(([productId, itemsNumber]) => (
        <UsersOrderItem
          key={productId}
          productId={productId}
          number={itemsNumber}
        />
      ))}
      <h6>Total: ${totalSum}</h6>
      <p>Status: {status}</p>
      <button>{status === "pending" ? "Confirm delivery" : "Completed"}</button>
    </div>
  );
};

export default memo(UsersOrderWrapper);
