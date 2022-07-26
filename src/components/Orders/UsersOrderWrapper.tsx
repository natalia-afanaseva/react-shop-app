import React, { memo, useMemo, useCallback, useState } from "react";
import { SingleOrder } from "../../types/data";
import UsersOrderItem from "./UsersOrderItem";
import { useAppSelector } from "../../redux/hooks";
import { months } from "../../utils/constants";
import { setDocWithId } from "../../service/generalRequests";

const UsersOrderWrapper: React.FC<SingleOrder> = ({
  products,
  totalSum,
  status,
  id,
  created,
}) => {
  const currentUserUid = useAppSelector((state) => state.auth.currentUserUid);

  const [orderStatus, setOrderStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const creationDate = useMemo(() => {
    const timestampToDate = created.toDate();
    const date = `${timestampToDate.getDate()} ${
      months[timestampToDate.getMonth()]
    }, ${timestampToDate.getFullYear()}`;
    return date;
  }, [created]);

  const handleStatusChange = useCallback(async () => {
    setLoading(true);
    if (!status || status === "completed") return;

    setOrderStatus("completed");

    await setDocWithId(`users/${currentUserUid}/orders/${id}`, {
      status: "completed",
    });

    setLoading(false);
  }, [status, currentUserUid, id]);

  return (
    <div className="order">
      <h6>
        Order #{id}, created on{" "}
        <time dateTime={created.toDate().toDateString()}>{creationDate}</time>
      </h6>
      {Object.entries(products).map(([productId, itemsNumber]) => (
        <UsersOrderItem
          key={productId}
          productId={productId}
          number={itemsNumber}
        />
      ))}
      <h6>Total: ${totalSum}</h6>
      <p>Status: {orderStatus}</p>
      <button onClick={handleStatusChange} disabled={loading}>
        {orderStatus === "pending" ? "Confirm delivery" : "Completed"}
      </button>
    </div>
  );
};

export default memo(UsersOrderWrapper);
