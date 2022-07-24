import React, { memo } from "react";

const Loader: React.FC = () => {
  return <div className="lds-dual-ring"></div>;
};

export default memo(Loader);
