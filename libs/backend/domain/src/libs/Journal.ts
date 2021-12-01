import { EntityBase } from "./Common/base/EntityBase";
import { ValueObjectBase } from "./Common/base/ValueObjectBase";
import { IllegalStateException } from "@maybert/backend/domain";
import { Document } from "./Document";


export class Invoice extends EntityBase {}

export class MonetaryAmount extends ValueObjectBase<MonetaryAmount> {
  protected equalsCore(obj: MonetaryAmount): boolean {
    return false;
  }
}

class AccountingPeriod extends ValueObjectBase<AccountingPeriod>{
  get Period(): number {
    return this._Period;
  }

  private readonly _Period: number;

  constructor(period: number) {
    super();
    if (period < 0) throw new IllegalStateException('An accounting period cannot be a negative number')
    if(period > 12) throw  new IllegalStateException('An accounting period should not be greater than 12')
    this._Period = period;
  }

  protected equalsCore(obj: AccountingPeriod): boolean {
    return this._Period === obj._Period;
  }

}

export class Supplier extends EntityBase{
  name: string
}

class LineItem {
  ProductId: string
  Price: number
  Quantity: number
}

export class Sale {
  InvoiceId: string;
  CustomerId: string;
  LineItems: LineItem[];
}


export class ChartOfAccount extends EntityBase{
  Name: string
  BusinessSegmentCategory: string
  BusinessSegment: string
  Status: boolean
}


export class Journal extends EntityBase {
  Document: Document;
  GeneralLedger: ChartOfAccount;
  Invoice: Invoice;
  Amount: MonetaryAmount;
  TransactionPostingDate: Date;
  Description: string;
  Period: AccountingPeriod


  constructor() {
    super();
  }
}
