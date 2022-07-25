import React, { memo } from "react";
import img from "../assets/cosm1.webp";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <img src={img} alt="cosmetics" />
      <h1>Page not found</h1>
    </div>
  );
};

export default memo(NotFound);
