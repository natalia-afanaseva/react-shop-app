import React, { memo, useMemo, useCallback, useState } from "react";
import { SingleOrder } from "../../types/SingleOrder";
import UsersOrderItem from "./UsersOrderItem";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useAppSelector } from "../../redux/hooks";
import { months } from "../../utils/constants";

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

    await setDoc(
      doc(db, `users/${currentUserUid}/orders/${id}`),
      {
        status: "completed",
      },
      { merge: true }
    );
    setLoading(false);
  }, [status, currentUserUid, id]);

  return (
    <div className="order">
      <h6>
        Order #{id}, created on {creationDate}
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
