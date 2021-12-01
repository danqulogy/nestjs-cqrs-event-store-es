import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FoodItemsRepository } from '@fom/backend/persistence';
import { InjectModel } from '@nestjs/mongoose';
import { CurrentSupplyFoodItems, CurrentSupplyFoodItemsDocument } from '../schemas/current-supply-items.schema';
import { Model } from 'mongoose';

export class GetAllCurrentFoodItemsQuery {
}

@QueryHandler(GetAllCurrentFoodItemsQuery)
export class GetAllCurrentFoodItemsQueryHandler implements IQueryHandler<GetAllCurrentFoodItemsQuery>{

  constructor(@InjectModel(CurrentSupplyFoodItems.name) private model: Model<CurrentSupplyFoodItemsDocument>) {
  }

  async execute(query: GetAllCurrentFoodItemsQuery): Promise<any> {
    return  this.model.find()
  }

}
