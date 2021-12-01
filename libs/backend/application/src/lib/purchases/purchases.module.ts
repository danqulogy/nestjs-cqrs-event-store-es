import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchaseFacade } from './purchase.facade';
import { EventStorePublisher } from '../core/event-store.publisher';
import { CqrsModule } from '@nestjs/cqrs';
import { PurchaseItemCommandHandler } from './purchase-item.command';

@Module({
  imports: [CqrsModule],
  providers: [PurchaseFacade, EventStorePublisher, PurchaseItemCommandHandler],
  controllers: [PurchasesController]
})
export class PurchasesModule{

}
