import React from "react";
import hero from "../assets/cosm1.webp";
import SingleProductCard from "../components/SingleProductCard";

const MainPage = (): JSX.Element => {
  return (
    <div className="hero">
      <section>
        <img src={hero} alt="hero with cosmetics" />
        <hgroup>
          <h1>
            Lorem ipsum
            <span> dolor sit amet consectetur adipisicing elit.</span>
          </h1>
          <h3>
            Ratione explicabo nemo repellendus pariatur, dolor in atque tempore
            vero
          </h3>
        </hgroup>
      </section>
      <section className="row justify-content-center my-4">
        <SingleProductCard />
        <SingleProductCard />
        <SingleProductCard />
      </section>
    </div>
  );
};

export default MainPage;
