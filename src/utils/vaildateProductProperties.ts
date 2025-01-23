import { IProductType } from '../types/ProductType';


/**
 * Validates if the given product name is a valid non-empty string.
 * 
 * @param {any} name - The product name to validate.
 * @returns {boolean} - Returns `true` if the name is a non-empty string; otherwise, `false`.
 */
const isValidProductName = (name: any) => {
  return (typeof name === 'string' && name.trim() !== '');
};


/**
 * Validates if the given product type is a valid type defined in `IProductType`.
 * 
 * @param {any} type - The product type to validate.
 * @returns {boolean} - Returns `true` if the type is a valid product type; otherwise, `false`.
 */
const isValidProductType = (type: any) => {
  return (typeof type === 'string' && (Object.values(IProductType) as string[]).includes(type));
};


/**
 * Validates if the given product inventory is a valid number within the range 1 to 9999.
 * 
 * @param {any} inventory - The product inventory to validate.
 * @returns {boolean} - Returns `true` if the inventory is a number within the valid range; otherwise, `false`.
 */
const isValidProductInventory = (inventory: any) => {
  return (typeof inventory === 'number' && inventory >= 1 && inventory <= 9999);
};


/**
 * Validates if the given product cost is a valid positive number.
 * 
 * @param {any} cost - The product cost to validate.
 * @returns {boolean} - Returns `true` if the cost is a positive number; otherwise, `false`.
 */
const isValidProductCost = (cost: any) => {
  return (typeof cost === 'number' && cost >= 0);
};


export {
  isValidProductName,
  isValidProductType,
  isValidProductInventory,
  isValidProductCost,
};

