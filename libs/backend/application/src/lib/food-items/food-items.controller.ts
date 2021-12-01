import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IsNotEmpty } from 'class-validator';
import { AddFoodItemCommand } from './writes/commands/add-food-item.command';

export class AddFoodItemDto{
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  buyPrice: number

  @IsNotEmpty()
  unit: string
}

@Controller('food-items')
export class FoodItemsController {

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }


  @Post()
  add(@Body() payload: AddFoodItemDto){
    return this.commandBus.execute(new AddFoodItemCommand(payload))
  }

}
