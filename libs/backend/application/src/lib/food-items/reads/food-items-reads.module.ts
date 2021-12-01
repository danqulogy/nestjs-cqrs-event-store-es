import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CurrentSupplyFoodItems,
  CurrentSupplyFoodItemsSchema,
} from './schemas/current-supply-items.schema';
import { FoodItemsProjector } from './food-items.projector';
import { FoodItemsReadsController } from './food-items-reads.controller';
import { GetAllCurrentFoodItemsQueryHandler } from './queries/get-all-current-food-items.query';
import { GetAllFoodItemsQueryHandler } from './queries/get-all-food-items.query';

const MODELS = [
  { name: CurrentSupplyFoodItems.name, schema: CurrentSupplyFoodItemsSchema },
];

const QUERY_HANDLERS = [GetAllCurrentFoodItemsQueryHandler, GetAllFoodItemsQueryHandler]

const SERVICES = [
  FoodItemsProjector
]

@Module({
  imports: [CqrsModule, MongooseModule.forFeature([...MODELS], 'reads')],
  providers: [...SERVICES, ...QUERY_HANDLERS],
  controllers: [FoodItemsReadsController]
})
export class FoodItemsReadsModule {}
