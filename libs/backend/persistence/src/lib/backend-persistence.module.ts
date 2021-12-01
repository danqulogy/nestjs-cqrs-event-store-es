import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME, UserSchema, UsersRepository, UsersSeederService } from './users';
import { ROLE_MODEL_NAME, RoleSchema, RoleSeederService, RolesRepository } from './roles';
import { ACTIVITY_LOG_MODEL, ActivityLogRepository, ActivityLogSchema } from './activity-logs';
import { SETTINGS_MODEL_NAME, SettingsRepository, SettingsSchema } from './settings';
import { SeederService } from './seeder.service';
import { BackendCommonModule } from '@fom/backend/common';
import { SCHOOL_MODEL_NAME, SchoolsSeederService, SchoolsRepository, SchoolsSchema } from './schools';
import { SMS_MODEL, SmsRepository, SmsSchema } from './sms';
import { UNITS_MODEL_NAME, UnitsRepository, UnitsSchema, UnitsSeederService } from './units';
import { FOOD_ITEMS_MODEL_NAME, FoodItemsRepository, FoodItemsSchema, FoodItemsSeederService } from './food-items';

const DB_MODELS: ModelDefinition[] = [
  {name: USER_MODEL_NAME, schema: UserSchema},
  {name: ROLE_MODEL_NAME, schema: RoleSchema},
  {name: ACTIVITY_LOG_MODEL, schema: ActivityLogSchema},
  {name: SETTINGS_MODEL_NAME, schema: SettingsSchema},
  {name: SCHOOL_MODEL_NAME, schema: SchoolsSchema},
  {name: SMS_MODEL, schema: SmsSchema},
  { name: UNITS_MODEL_NAME, schema: UnitsSchema},
  { name: FOOD_ITEMS_MODEL_NAME, schema: FoodItemsSchema},
]

const REPOSITORIES = [
  RolesRepository,
  UsersRepository,
  ActivityLogRepository,
  SettingsRepository,
  SchoolsRepository,
  SmsRepository,
  UnitsRepository,
  FoodItemsRepository,
]


const SERVICES = [
  SeederService
]

const SEEDERS = [
  SchoolsSeederService,
  RoleSeederService,
  UsersSeederService,
  UnitsSeederService,
  FoodItemsSeederService
]

@Module({
  imports: [BackendCommonModule, MongooseModule.forFeature(DB_MODELS)],
  providers: [...REPOSITORIES, ...SERVICES, ...SEEDERS],
  exports: [...REPOSITORIES, MongooseModule],
})
export class BackendPersistenceModule {
  constructor(private seeder: SeederService) {}

  async onModuleInit(): Promise<any> {
    await this.seeder
      .seed()
      .then(() => {
        // Logger.debug('Seeding completed!');
      })
      .catch((error) => {
        // Logger.error('Seeding ERRP!', error);
      });
  }
}
