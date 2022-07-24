import { Timestamp } from "firebase/firestore";

export type SingleOrder = {
  id: string;
  created: Timestamp;
  products: {
    [key: string]: number;
  };
  totalSum: number;
  status: string;
};

export type SingleProduct = {
  id: string;
  description: string;
  effect: string;
  name: string;
  photo: string[];
  price: number;
};
