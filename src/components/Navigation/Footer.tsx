import React, { memo } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="navbar navbar-expand-lg px-5">
      <Link to="/">
        <h1>Cosmetique</h1>
      </Link>

      <address className="collapse navbar-collapse justify-content-end">
        Natalia Afanaseva (c) 2022
      </address>
    </footer>
  );
};

export default memo(Footer);
