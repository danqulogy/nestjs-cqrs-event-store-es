import { IEvent } from '@nestjs/cqrs';
import { PurchaseItemDto } from './purchase-item.dto';
import { AppEventsEnum } from './views';

export class ProductPurchaseEvent implements IEvent{
  type: AppEventsEnum.ProductPurchasedEvent

  constructor(
    public readonly streamId: string,
    public readonly data: PurchaseItemDto) {
  }
}

