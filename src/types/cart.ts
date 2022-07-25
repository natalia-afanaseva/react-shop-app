import React from "react";

export type CartItemProps = {
  productId: string;
  number: number;
  setTotalSum: React.Dispatch<React.SetStateAction<number>>;
};
