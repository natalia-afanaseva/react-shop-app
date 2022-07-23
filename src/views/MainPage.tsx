import React, { useEffect, useState } from "react";
import hero from "../assets/cosm1.webp";
import SingleProductCard from "../components/SingleProductCard";
import { db } from "../utils/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import Loader from "../components/Loader";

const MainPage = (): JSX.Element => {
  const [products, setProducts] = useState<
    { id: string; data: DocumentData }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setLoading(false);
    });
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
                imageMain={product.data.photo[0]}
                imageFallback={product.data.photo[1]}
                name={product.data.name}
                price={product.data.price}
                id={product.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default MainPage;
