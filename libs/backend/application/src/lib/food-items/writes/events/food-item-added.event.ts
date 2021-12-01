import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BusinessEvent } from '../../../core/IBusinessEvent';
import { AppEventsEnum } from '../../../purchases/views';

export class FoodItemAddedDto{
  constructor(
    public readonly id: string,
    public readonly name: string,
              public readonly marketPrice: number,
              public readonly active: boolean) {
  }
}

export class FoodItemAddedEvent implements BusinessEvent<FoodItemAddedDto>{

  constructor(public readonly streamId: string,
              public readonly data: FoodItemAddedDto,
              public readonly type = AppEventsEnum.FoodItemAdded) {
  }
}

@EventsHandler(FoodItemAddedEvent)
export class FoodItemAddedEventHandler implements IEventHandler<FoodItemAddedEvent>{
  handle(event: FoodItemAddedEvent): any {
    console.log('[In-Memory] FoodItemAddedEventHandler: ', event)
  }

}
