import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllSchoolsQuery } from './get-all-schools.query';
import { DispatchEnrollmentNoticeCommand } from './dispatch-enrollment-notice.command';
import { GetSchoolByEnrollmentKeyQuery } from './get-school.query';
import { EnrollSchoolDto } from '@fom/shared/api-dtos';
import { EnrollSchoolCommand } from './enroll-school.command';

@Controller('schools')
export class SchoolController {

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  @Get()
  getAll(){
    return this.queryBus.execute(new GetAllSchoolsQuery());
  }

  @Get('keys/:key')
  getByEnrollmentKeyId(@Param('key') key: string){
    return this.queryBus.execute(new GetSchoolByEnrollmentKeyQuery(key));
  }

  @Post('enrollment-notice')
  dispatchEnrollmentNotice(){
    return this.commandBus.execute(new DispatchEnrollmentNoticeCommand());
  }

  @Post('enroll')
  update(@Body() payload: EnrollSchoolDto){
    return this.commandBus.execute(new EnrollSchoolCommand(payload));
  }

  // @Delete(':id')
  // @UseGuards(AuthGuard())
  // delete(@Param('id') payload: string,  @GetAuthUser() user: IUser){
  //   return this.commandBus.execute(new DeleteMemberCommand(payload, user));
  // }
}
