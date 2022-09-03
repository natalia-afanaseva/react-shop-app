import React, { memo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SingleOrder } from "../types/data";
import Loader from "../components/shared/Loader";
import UsersOrderWrapper from "../components/Orders/UsersOrderWrapper";
import { getAllDocs } from "../service/generalRequests";

const UserOrders: React.FC = () => {
  const navigate = useNavigate();

  const currentUserUid = useAppSelector((state) => state.auth.currentUserUid);

  const [orders, setOrders] = useState<SingleOrder[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [activeSort, setActiveSort] = useState("");

  useEffect(() => {
    if (!currentUserUid) {
      return navigate("/");
    }
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
  }, [currentUserUid, navigate]);

  const handleSort = useCallback(
    (type: "date" | "status") => {
      switch (type) {
        case "date":
          if (orders && orders?.length > 0) {
            setActiveSort("date");
            const copied = [...orders];
            copied.sort(function sortByDate(a, b) {
              return b.created.seconds - a.created.seconds;
            });
            setOrders(copied);
          }
          break;

        case "status":
          if (orders && orders?.length > 0) {
            setActiveSort("status");
            const copied = [...orders];
            copied.sort(function sortByStatus(a, b) {
              if (a.status < b.status) {
                return -1;
              }
              if (a.status > b.status) {
                return 1;
              }
              return 0;
            });
            setOrders(copied);
          }
          break;

        default:
          break;
      }
    },
    [orders]
  );

  return (
    <div className="row py-5 justify-content-center orders">
      <div className="col-12 col-lg-8">
        <h3>Your Orders</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders && orders.length > 0 ? (
              <>
                <div className="d-flex align-items-center flex-column flex-lg-row">
                  <h6 className="col-12 col-lg-8">Sort by: </h6>
                  <button
                    type="button"
                    className={`col-12 col-lg-2 ${
                      activeSort === "date" ? "text-decoration-underline" : ""
                    }`}
                    onClick={() => handleSort("date")}
                  >
                    Order date
                  </button>
                  <button
                    type="button"
                    className={`col-12 col-lg-2 ${
                      activeSort === "status" ? "text-decoration-underline" : ""
                    }`}
                    onClick={() => handleSort("status")}
                  >
                    Status
                  </button>
                </div>
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
            ) : (
              <h6>No orders yet.</h6>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(UserOrders);
