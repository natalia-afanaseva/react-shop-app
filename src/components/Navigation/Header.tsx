import React, { memo, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../Context";
import { navLinks } from "../../utils/constants";
import { handleSignIn } from "../../utils/firebaseAuth";

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuth } = useContext(Context);

  return (
    <header className="navbar navbar-expand-lg px-5">
      <Link to="/">
        <h1>Cosmetique</h1>
      </Link>

      <nav className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {navLinks.map((navLink) => (
            <li key={navLink.name} className="nav-item">
              <Link
                to={navLink.link}
                className={`nav-link ${
                  location.pathname === navLink.link ? "fw-bold" : ""
                }`}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
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
              <a href="#" className="nav-link" onClick={handleSignIn}>
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default memo(Header);
