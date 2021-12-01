import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FOOD_ITEMS_MODEL_NAME, FoodItemDocument, IFoodItem } from './food-items.schema';

@Injectable()
export class FoodItemsRepository {
  constructor(
    @InjectModel(FOOD_ITEMS_MODEL_NAME)
    private model: Model<FoodItemDocument>
  ) {}


  seed(data: IFoodItem) {
    return new this.model(data).save();
  }

  async findByName(name: string): Promise<IFoodItem> {
    return this.model.findOne({name})
  }

  async getAll(): Promise<IFoodItem[]> {
    return this.model.find()
  }

  async addItem(item: IFoodItem) {
    return this.model.create({name: item.name, unit: 'bags'})
  }
}
