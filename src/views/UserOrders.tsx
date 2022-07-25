import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { SingleOrder } from "../types/data";
import Loader from "../components/shared/Loader";
import UsersOrderWrapper from "../components/Orders/UsersOrderWrapper";
import { getAllDocs } from "../service/generalRequests";

const UserOrders: React.FC = () => {
  const currentUserUid = useAppSelector((state) => state.auth.currentUserUid);

  const [orders, setOrders] = useState<SingleOrder[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUserUid) return;
    setLoading(true);

    getAllDocs("users", currentUserUid, "orders")
      .then((result) => {
        if (!result) return;
        const ord = result.map((doc: any) => ({
          id: doc.id,
          created: doc.data().created,
          products: doc.data().products,
          totalSum: doc.data().totalSum,
          status: doc.data().status,
        }));
        setOrders(ord);
      })
      .finally(() => setLoading(false));
  }, [currentUserUid]);

  return (
    <div className="row py-5 justify-content-center orders">
      <div className="col-12 col-lg-8">
        <h3>Your Orders</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders?.map((order) => (
              <UsersOrderWrapper
                id={order.id}
                created={order.created}
                products={order.products}
                status={order.status}
                totalSum={order.totalSum}
                key={order.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(UserOrders);
