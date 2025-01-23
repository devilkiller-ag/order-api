enum IProductType {
  gadget = 'gadget',
  book = 'book',
  food = 'food',
  other = 'other'
}


interface IProduct {
  id: number;
  name: string;
  type: IProductType;
  inventory: number;
}


export type {
  IProductType,
  IProduct
};
