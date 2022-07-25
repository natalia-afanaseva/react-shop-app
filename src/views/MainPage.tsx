import React, { useEffect, useState, memo } from "react";
import hero from "../assets/cosm1.webp";
import SingleProductCard from "../components/MainPage/SingleProductCard";
import Loader from "../components/shared/Loader";
import { getAllDocs } from "../service/generalRequests";

const MainPage: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllDocs("products")
      .then((result) => {
        setProducts(result);
      })
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <Loader />
        ) : (
          <>
            {products.map((product) => (
              <SingleProductCard
                key={product.id}
                imageMain={product.data().photo[0]}
                imageFallback={product.data().photo[1]}
                name={product.data().name}
                price={product.data().price}
                id={product.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default memo(MainPage);
