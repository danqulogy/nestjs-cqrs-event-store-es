import { ChartOfAccount } from "./Journal";
import { AggregateRootBase } from "./Common/base/AggregateRootBase";

export class ProductCategory extends AggregateRootBase {
  Name: string;
  ParentCategory: ProductCategory
  RevenueAccount: ChartOfAccount
  PurchaseAccount: ChartOfAccount


  constructor(name: string, revenueAccount:ChartOfAccount, purchaseAccount: ChartOfAccount, parentCategory=null) {
    super();
    this.Name = name
    this.RevenueAccount = revenueAccount
    this.PurchaseAccount = purchaseAccount
    this.ParentCategory = parentCategory
  }
}

