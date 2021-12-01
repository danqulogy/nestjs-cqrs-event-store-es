import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { TempPurchaseOrderLineItemsStore } from './temp-purchase-order-line-items.store';
import { TempPurchaseOrderLineItemDto } from '@fom/shared/api-dtos';
import { TempPurchaseOrderLineItemsQuery } from './temp-purchase-order-line-items.query';
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({ providedIn: 'root' })
export class TempPurchaseOrderLineItemsService {
  constructor(
    private tempPurchaseOrderLineItemsStore: TempPurchaseOrderLineItemsStore,
    private query: TempPurchaseOrderLineItemsQuery,
    private http: HttpClient,
    private message: NzMessageService
  ) {}

  add(tempPurchaseOrderLineItem: TempPurchaseOrderLineItemDto) {
    this.tempPurchaseOrderLineItemsStore.add(tempPurchaseOrderLineItem);
  }

  update(id, tempPurchaseOrderLineItem: Partial<TempPurchaseOrderLineItemDto>) {
    const itemExist = this.query
      .getAll()
      .find((s) => s.itemRefId === tempPurchaseOrderLineItem.itemRefId);

    if (itemExist) {
      this.message.info('Item already exist');
      this.remove(id);

      return;
    }
    this.tempPurchaseOrderLineItemsStore.update(id, tempPurchaseOrderLineItem);
  }

  remove(id: ID) {
    this.tempPurchaseOrderLineItemsStore.remove(id);
  }
}
