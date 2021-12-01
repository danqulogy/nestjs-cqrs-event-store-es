import { EntityBase } from "./Common/base/EntityBase";
import { ProductCategory } from "./ProductCategory";
import { Supplier } from "./Supplier";
import { ProductAccountSet } from "./ProductAccountSet";

export class Product extends EntityBase{
  Id: string;
  name: string;
  description: string;
  category: ProductCategory;

  /**
   * @name SupplierId: Also known as CreditorId
   */
  Supplier: Supplier;

  accountingSet: ProductAccountSet

  VATCodeId: string
}
