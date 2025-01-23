import { IProductType } from "../types/ProductType";

function getProductType(type: string): IProductType {
  let productType: IProductType;

  switch (type.toLowerCase()) {
    case 'gadget':
      productType = IProductType.GADGET;
      break;
    case 'book':
      productType = IProductType.BOOK;
      break;
    case 'food':
      productType = IProductType.FOOD;
      break;
    case 'other':
      productType = IProductType.OTHER;
      break;
    default:
      productType = IProductType.OTHER;
      break;
  }
  return productType;
}


export default getProductType;
