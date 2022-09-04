import React, { memo } from "react";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
    </div>
  );
};

export default memo(NotFound);
