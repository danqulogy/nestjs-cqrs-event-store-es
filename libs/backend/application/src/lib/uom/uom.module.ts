import { Module } from '@nestjs/common';
import { BackendPersistenceModule } from '@fom/backend/persistence';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';
import { UnitsController } from './units.controller';
import { GetAllUnitsQueryHandler } from './getAllUnitsQuery';

const COMMAND_HANDLERS = [
];

const QUERY_HANDLERS = [GetAllUnitsQueryHandler];

@Module({
  imports: [BackendPersistenceModule, AuthModule, CqrsModule],
  controllers: [UnitsController],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS],
})
export class UomModule {}
