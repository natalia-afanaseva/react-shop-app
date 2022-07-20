import React from "react";
import { useParams } from "react-router-dom";

const ProductPage: React.FC = (): JSX.Element => {
  let params = useParams();
  return (
    <>
      <div>ProductPage {params.productId}</div>
    </>
  );
};

export default ProductPage;
