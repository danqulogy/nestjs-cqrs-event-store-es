export interface IBrand{
  _id?: string;
  name: string;
  active?: boolean
}

export interface IWarehouse{
  _id?: string;
  name: string;
  active?: boolean;
}



export interface IItemTax{
  _id?: string
  lineItemId: string
  taxId: string
}
