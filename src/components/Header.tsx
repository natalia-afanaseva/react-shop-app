import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../utils/constants";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="navbar navbar-expand-lg px-5">
      <Link to="/">
        <h1>Cosmetique</h1>
      </Link>

      <nav className="collapse navbar-collapse justify-content-end">
        {
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
          </ul>
        }
      </nav>
    </header>
  );
};

export default memo(Header);
