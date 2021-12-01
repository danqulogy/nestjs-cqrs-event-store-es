import { Controller, Get, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetRolesListQuery } from '../queries/get-roles-list.query'

@Controller('roles')
export class RolesController {

  constructor(private queryBus: QueryBus) {
  }

  @Get()
  GetRolesList(@Query('status') status: 'active'|'inactive'|undefined){
    return this.queryBus.execute(new GetRolesListQuery(status))
  }

  @Get('id')
  addClientAppToRoleAccess(clientAppUrl: string){

  }

  @Get('id')
  removeClientAppFromRoleAccess(clientAppUrl: string){

  }

  @Get('id')
  changeUserRoleCardinality(cardinality: number){

  }

  @Get('id')
  changeActiveStatus(){
    // todo: should affect all users under role
  }

  @Get('id')
  addPermission(){

  }

  @Get('id')
  removePermission(){

  }

  @Get('id')
  getPermissions(){

  }
}
