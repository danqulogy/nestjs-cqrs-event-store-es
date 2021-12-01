import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentSupplyFoodItems, CurrentSupplyFoodItemsDocument } from '../schemas/current-supply-items.schema';
import { Model } from 'mongoose';

export class GetAllFoodItemsQuery {
}

@QueryHandler(GetAllFoodItemsQuery)
export class GetAllFoodItemsQueryHandler implements IQueryHandler<GetAllFoodItemsQuery>{

  constructor(@InjectModel(CurrentSupplyFoodItems.name) private model: Model<CurrentSupplyFoodItemsDocument>) {
  }

  async execute(query: GetAllFoodItemsQuery): Promise<any> {
    return  this.model.find()
  }

}
