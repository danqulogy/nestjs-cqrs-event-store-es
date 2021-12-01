import { PurchaseItemDto } from './purchase-item.dto';
import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventStorePublisher } from '../core/event-store.publisher';

export class PurchaseItemCommand{
  constructor(
    public readonly payload: PurchaseItemDto) {
  }
}

@CommandHandler(PurchaseItemCommand)
export class PurchaseItemCommandHandler implements ICommandHandler<PurchaseItemCommand>{
  constructor(private eventPublisher: EventPublisher,
              private eventStoreBus: EventStorePublisher,
              private eventBus: EventBus) {
  }
  async execute(command: PurchaseItemCommand): Promise<any> {


    return { message: 'Your request is been processed' };
  }

}
