export type CartProduct = {
  title: string;
  quantity: number;
  price: number; // novo campo
};

export type CartProductMap = {
  [uuid: string]: CartProduct;
};