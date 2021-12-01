import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';

export type CurrentSupplyFoodItemsDocument = CurrentSupplyFoodItems & Document;

@Schema()
export class CurrentSupplyFoodItems {
  @Prop()
  foodItemId: string;

  @Prop()
  name: string;

  @Prop()
  buyingPrice: number;
}

export const CurrentSupplyFoodItemsSchema = SchemaFactory.createForClass(CurrentSupplyFoodItems);

