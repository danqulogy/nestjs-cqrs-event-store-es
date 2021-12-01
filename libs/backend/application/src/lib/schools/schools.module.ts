import { Module } from '@nestjs/common';
import { BackendPersistenceModule } from '@fom/backend/persistence';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';
import { GetAllSchoolsQueryHandler } from './get-all-schools.query';
import { SchoolController } from './school.controller';
import { DispatchEnrollmentNoticeCommandHandler } from './dispatch-enrollment-notice.command';
import { GetSchoolByEnrollmentKeyQueryHandler } from './get-school.query';
import { EnrollSchoolCommandHandler } from './enroll-school.command';

const COMMAND_HANDLERS = [
  DispatchEnrollmentNoticeCommandHandler,
  EnrollSchoolCommandHandler
];

const QUERY_HANDLERS = [GetAllSchoolsQueryHandler, GetSchoolByEnrollmentKeyQueryHandler];

@Module({
  imports: [BackendPersistenceModule, AuthModule, CqrsModule],
  controllers: [SchoolController],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS],
})
export class SchoolsModule {}
