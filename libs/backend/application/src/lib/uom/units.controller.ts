import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllUnitsQuery } from './getAllUnitsQuery';

@Controller('units')
export class UnitsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus){}

  @Get()
  getAll(){
    return this.queryBus.execute(new GetAllUnitsQuery())
  }

  // @Post()
  // @UseGuards(AuthGuard())
  // add(@Body() payload: AddUnitDto, @GetAuthUser() user: IUser){
  //   return this.commandBus.execute(new AddUnitCommand(payload, user))
  // }
  //
  // @Patch(':id')
  // @UseGuards(AuthGuard())
  // update(@Body() payload: UnitsInListDto, @GetAuthUser() user: IUser){
  //   return this.commandBus.execute(new UpdateUnitCommand(payload, user))
  // }
  //
  // @Delete(':id')
  // @UseGuards(AuthGuard())
  // delete(@Param('id') id: string, @GetAuthUser() user: IUser){
  //   return this.commandBus.execute(new DeleteUnitCommand(id, user))
  // }
}
