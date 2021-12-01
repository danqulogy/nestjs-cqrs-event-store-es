import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { TempRequisitionLineItemsStore } from './temp-requisition-line-items.store';
import { QuoteLineItemDto, TempRequisitionLineItem } from "@fom/shared/api-dtos";

@Injectable({ providedIn: 'root' })
export class TempRequisitionLineItemsService {

  constructor(private tempRequisitionLineItemsStore: TempRequisitionLineItemsStore, private http: HttpClient) {
  }


  add(tempRequisitionLineItem: TempRequisitionLineItem) {
    this.tempRequisitionLineItemsStore.add(tempRequisitionLineItem);
  }

  update(id, tempRequisitionLineItem: Partial<TempRequisitionLineItem>) {
    this.tempRequisitionLineItemsStore.update(id, tempRequisitionLineItem);
  }

  remove(id: string) {
    this.tempRequisitionLineItemsStore.remove(id);
  }

  setActive(id: string) {
    this.tempRequisitionLineItemsStore.setActive(id);
  }

  clearCache() {
    this.tempRequisitionLineItemsStore.setHasCache(false, { restartTTL: true });
  }

  addMany(lineItems: TempRequisitionLineItem[]) {
    this.tempRequisitionLineItemsStore.set(lineItems)

  }

}
