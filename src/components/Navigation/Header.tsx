import React, { memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setLogin, setLogout } from "../../redux/slices/auth";
import { signIn } from "../../utils/firebaseAuth";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const handleSignIn = useCallback(async () => {
    const result = await signIn();
    if (result) {
      dispatch(setLogin(result));
    } else {
      dispatch(setLogout());
    }
  }, [dispatch]);

  return (
    <header className="navbar navbar-expand-lg px-5">
      <Link to="/">
        <h1>Cosmetique</h1>
      </Link>

      <nav className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Checkout
            </button>
          </li>
          {isAuth ? (
            <li className="nav-item">
              <Link
                to="/orders"
                className={`nav-link ${
                  location.pathname === "/orders" ? "fw-bold" : ""
                }`}
              >
                Orders
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link" onClick={handleSignIn}>
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default memo(Header);
