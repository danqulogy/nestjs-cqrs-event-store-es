import { Module } from '@nestjs/common';
import { BackendPersistenceModule } from '@fom/backend/persistence';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';
import { FoodItemsController } from './food-items.controller';
import { AddFoodItemCommandHandler } from './writes/commands/add-food-item.command';
import { EventStorePublisher } from '../core/event-store.publisher';
import { FoodItemAddedEventHandler } from './writes/events/food-item-added.event';
import { FoodItemsReadsModule } from './reads/food-items-reads.module';


const COMMAND_HANDLERS = [
  AddFoodItemCommandHandler
];



const EVENT_HANDLERS = [
  FoodItemAddedEventHandler
]



@Module({
  imports: [

    CqrsModule,
    BackendPersistenceModule,
    AuthModule,
    FoodItemsReadsModule
  ],
  controllers: [FoodItemsController],
  providers: [...COMMAND_HANDLERS, ...EVENT_HANDLERS,
    {
      provide: EventStorePublisher,
      useClass: EventStorePublisher
    }
  ],
})
export class FoodItemsModule {}
