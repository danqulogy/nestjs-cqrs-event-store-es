import { Controller, Get, MessageEvent, Sse } from '@nestjs/common';
import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentSupplyFoodItems, CurrentSupplyFoodItemsDocument } from './schemas/current-supply-items.schema';
import { Model } from 'mongoose';
import { GetAllFoodItemsQuery } from './queries/get-all-food-items.query';

@Controller('food-items')
export class FoodItemsReadsController{

  constructor(private queryBus: QueryBus,
              @InjectModel(CurrentSupplyFoodItems.name)
              private model: Model<CurrentSupplyFoodItemsDocument>){

  }
  @Sse('sse')
  async sse(): Promise<Observable<MessageEvent>> {
    const data = await this.model.find()
    // return of({ data })
    return interval(1000).pipe(map((_) => ({ data })));
  }

  @Get()
  async index() {
    return this.queryBus.execute(new GetAllFoodItemsQuery())
  }
}
