import { type IProduct, MOCK_PRODUCTS } from "./product";

export interface ICart {
  id: number;
  products: number[];
}

const MOCK_CARTS: ICart[] = [
  //тоже ненастоящие корзины, временно используем для примера
  {
    id: 1,
    products: [MOCK_PRODUCTS[0].id, MOCK_PRODUCTS[1].id, MOCK_PRODUCTS[2].id],
  },
  {
    id: 2,
    products: [MOCK_PRODUCTS[0].id, MOCK_PRODUCTS[1].id, MOCK_PRODUCTS[2].id],
  },
];

function addToCardById(id: number, products: number[]) {
  let index: number | undefined;
  MOCK_CARTS.forEach((item, i) => {
    if (item.id == id) {
      index = i;
    }
  });

  if (index) {
    MOCK_CARTS[index].products = [...MOCK_CARTS[index].products, ...products];
    return true;
  } else {
    return undefined;
  }
}

export { MOCK_CARTS, addToCardById };
