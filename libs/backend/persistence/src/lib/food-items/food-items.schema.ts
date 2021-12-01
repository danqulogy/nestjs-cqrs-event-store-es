import { Document, Schema } from 'mongoose';

export const FOOD_ITEMS_MODEL_NAME = 'food_items';

export const FoodItemsSchema = new Schema(
  {
    foodItemId: { type: String },
    name: { type: String, required: true },
    unit: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export interface IFoodItem {
  _id?: string;
  foodItemId: string;
  name: string;
  unit: string;
  active?: boolean;
}

export class FoodItemDocument extends Document implements IFoodItem {
  foodItemId: string;
  active: boolean;
  name: string;
  unit: string;
}
