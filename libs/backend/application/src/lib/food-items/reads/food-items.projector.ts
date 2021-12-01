import { Injectable, Logger } from '@nestjs/common';
import { eventStoreClient } from '@fom/backend/application';
import { AllStreamRecordedEvent, Credentials } from '@eventstore/db-client';
import { AppEventsEnum } from '../../purchases/views';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentSupplyFoodItems, CurrentSupplyFoodItemsDocument } from './schemas/current-supply-items.schema';
import { Model } from 'mongoose';
import { FoodItemAddedDto } from '../writes/events/food-item-added.event';

@Injectable()
export class FoodItemsProjector{

  client = eventStoreClient

  constructor(@InjectModel(CurrentSupplyFoodItems.name) private model: Model<CurrentSupplyFoodItemsDocument>) {
    this.init()

  }

  async init(){
    Logger.debug('Dropping CurrentSupplyFoodItems projections...')
    await this.drop()

    const credentials:Credentials = {
      username: 'admin',
      password: 'changeit'
    }

    Logger.debug('Relaying FoodItems events...')
    this.client.subscribeToAll({
      credentials: credentials
    }).on('data', (event) => {
      if(event.event.isJson && event.event.type === AppEventsEnum.FoodItemAdded ){
        console.log('subscriptions',event.event)
      }

      switch (event.event.type) {
        case AppEventsEnum.FoodItemAdded:
          return this.onFoodItemAdded(event.event)
      }
    })
  }

  private async onFoodItemAdded(event: AllStreamRecordedEvent) {
    const data  = event.data as unknown as FoodItemAddedDto
    await this.model.create({
      name: data.name,
      foodItemId: data.id,
      buyingPrice: data.marketPrice
    })
    console.log('FoodItemAdded Projection Executed',data)
  }

  async drop(): Promise<any> {
    return this.model.deleteMany({});
  }
}
