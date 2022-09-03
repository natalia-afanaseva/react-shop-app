import React, { memo, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setLogin, setLogout } from "../../redux/slices/auth";
import signIn from "../../service/auth";
import useDebounce from "../../utils/hooks";
import BaseModal from "../shared/BaseModal";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debouncedInputValue = useDebounce(inputValue);

  const handleLogout = useCallback(() => dispatch(setLogout()), [dispatch]);

  const handleSignIn = useCallback(
    async (value: string) => {
      const result = await signIn(value);
      if (result) {
        dispatch(setLogin(result));
      } else {
        handleLogout();
      }
      setAuthModalOpen(false);
    },
    [dispatch, handleLogout]
  );

  return (
    <>
      <BaseModal show={authModalOpen} onHide={() => setAuthModalOpen(false)}>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Username"
        />
        <button type="button" onClick={() => handleSignIn(debouncedInputValue)}>
          Login
        </button>
      </BaseModal>

      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link to="/">
              <h1>Cosmetique</h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-lg-end"
              id="navbarSupportedContent"
            >
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
                  <>
                    <li className="nav-item">
                      <Link
                        to="/orders"
                        className={`nav-link text-center text-lg-start ${
                          location.pathname === "/orders"
                            ? "fw-bold text-decoration-underline"
                            : ""
                        }`}
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default memo(Header);
