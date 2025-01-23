import { IProductType } from "../types/ProductType";

/**
 * Returns the product type based on the input string.
 *
 * @param {string} type - The type of product as a string (e.g., 'gadget', 'book', 'food', or 'other').
 * @returns {IProductType} The corresponding product type as an enum value.
 *
 * @example
 * const productType = getProductType('gadget');
 * console.log(productType); // Outputs IProductType.GADGET
 *
 * @throws Will not throw any errors but defaults to `IProductType.OTHER` for unrecognized input.
 */
function getProductType(type: string): IProductType {
  const productTypes: Record<string, IProductType> = {
    gadget: IProductType.GADGET,
    book: IProductType.BOOK,
    food: IProductType.FOOD,
    other: IProductType.OTHER
  };
  return productTypes[type.toLowerCase()];

}


export default getProductType;
