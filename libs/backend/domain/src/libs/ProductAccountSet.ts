import { EntityBase } from "./Common/base/EntityBase";
import { CostingMethod } from './CostingMethod';
import { ChartOfAccount } from "./Journal";

export class ProductAccountSet extends EntityBase {
  /**
   * @description Describes a name given to an instance of product account set
   * @example Machines AccountSet
   */
  Name: string;
  CostingMethod: CostingMethod;
  StockAccount: ChartOfAccount;
  PayableAccount: ChartOfAccount;
  ShipmentAccount: ChartOfAccount;
}
