export type SingleOrder = {
  id: string;
  created: Date;
  products: {
    [key: string]: number;
  };
  totalSum: number;
  status: string;
};
