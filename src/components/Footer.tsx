import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../utils/constants";

const Footer: React.FC = () => {
  return (
    <footer className="navbar navbar-expand-lg px-5">
      <Link to="/">
        <h1>Cosmetique</h1>
      </Link>

      <nav className="collapse navbar-collapse justify-content-end">
        {
          <ul className="navbar-nav">
            {navLinks.map((navLink) => (
              <li key={navLink.name} className="nav-item">
                <Link to={navLink.link} className="nav-link text-white">
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
        }
      </nav>
    </footer>
  );
};

export default Footer;
