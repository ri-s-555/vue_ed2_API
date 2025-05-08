import { type IProduct, MOCK_PRODUCTS } from "./product";

interface ICart {
  id: number;
  products: IProduct[];
}
const MOCK_CARTS: ICart[] = [
  {
    id: 1,
    products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
  },
];

export { MOCK_CARTS };
