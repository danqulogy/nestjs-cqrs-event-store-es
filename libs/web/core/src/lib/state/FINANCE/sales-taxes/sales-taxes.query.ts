import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { SalesTaxesState, SalesTaxesStore } from "./sales-taxes.store";
import { map } from "rxjs/operators";
import { DefaultAppSettings } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class SalesTaxesQuery extends QueryEntity<SalesTaxesState> {

  defaultSalesTax = this.selectAll().pipe(map(data => data.find(d => d.tag === DefaultAppSettings.DEFAULT_ITEMS_SALES_TAX)))
  defaultGetFundTax = this.selectAll().pipe(map(data => data.find(d => d.tag === DefaultAppSettings.DEFAULT_GET_FUND_TAX)))
  defaultNhilTax = this.selectAll().pipe(map(data => data.find(d => d.tag === DefaultAppSettings.DEFAULT_NHIL_TAX)))
  defaultVat12Tax = this.selectAll().pipe(map(data => data.find(d => d.tag === DefaultAppSettings.DEFAULT_VAT12_TAX)))

  constructor(protected store: SalesTaxesStore) {
    super(store);
  }

}
