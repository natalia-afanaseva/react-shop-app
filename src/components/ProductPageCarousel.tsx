import React from "react";
import img from "../assets/cosm2.jpg";
import img1 from "../assets/cosm1.webp";

const ProductPageCarousel: React.FC = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img} className="d-block w-100" alt="first" />
        </div>
        <div className="carousel-item">
          <img src={img1} className="d-block w-100" alt="sec" />
        </div>
        <div className="carousel-item">
          <img src={img} className="d-block w-100" alt="th" />
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

export default ProductPageCarousel;
