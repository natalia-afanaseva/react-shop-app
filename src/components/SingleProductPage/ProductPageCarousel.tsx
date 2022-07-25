import React, { memo } from "react";
import { ProductPageCarouselProps } from "../../types/singleProduct";

const ProductPageCarousel: React.FC<ProductPageCarouselProps> = ({
  photos,
}) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={photos?.[0]} className="d-block w-100" alt="product" />
        </div>
        <div className="carousel-item">
          <img src={photos?.[1]} className="d-block w-100" alt="product" />
        </div>
        <div className="carousel-item">
          <img src={photos?.[2]} className="d-block w-100" alt="product" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default memo(ProductPageCarousel);
