import React, { memo, useMemo, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../utils/firebaseConfig";
import { SingleOrder } from "../types/SingleOrder";
import Loader from "../components/Loader";
import UsersOrderItem from "../components/UsersOrderItem";

const UserOrders: React.FC = () => {
  const auth = getAuth();

  const uid = useMemo(() => auth.currentUser?.uid, [auth]);

  const [orders, setOrders] = useState<SingleOrder[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    getDocs(collection(db, "users", uid, "orders"))
      .then((result) => {
        if (result.empty) return;
        const ord = result.docs.map((doc) => ({
          id: doc.id,
          created: doc.data().created,
          products: doc.data().products,
          totalSum: doc.data().totalSum,
          status: doc.data().status,
        }));
        setOrders(ord);
      })
      .finally(() => setLoading(false));
  }, [uid]);

  return (
    <div className="row py-5 justify-content-center orders">
      <div className="col-12 col-lg-8">
        <h3>Your Orders</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders?.map((order) => (
              <div key={order.id} className="order">
                {Object.entries(order.products).map(
                  ([productId, itemsNumber]) => (
                    <UsersOrderItem
                      key={productId}
                      productId={productId}
                      number={itemsNumber}
                    />
                  )
                )}
                <h6>Total: ${order.totalSum}</h6>
                <p>Status: {order.status}</p>
                <button>
                  {order.status === "pending"
                    ? "Confirm delivery"
                    : "Completed"}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(UserOrders);
