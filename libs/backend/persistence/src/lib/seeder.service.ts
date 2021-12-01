import { Injectable } from '@nestjs/common';
import * as async from 'async';
import { FeLogger } from '@fom/backend/common';
import { RoleSeederService } from './roles';
import { UsersSeederService } from './users';
import { SchoolsSeederService } from './schools/schools-seeder.service';
import { UnitsSeederService } from './units';
import { FoodItemsSeederService } from './food-items';



@Injectable()
export class SeederService {
  constructor(
    private console: FeLogger,
    private rolesSeederService: RoleSeederService,
    private usersSeeder: UsersSeederService,
    private schoolsSeeder: SchoolsSeederService,
    private unitsSeeder: UnitsSeederService,
    private foodItemsSeeder: FoodItemsSeederService
  ) {
    this.console.setContext(SeederService.name);
  }

  async seed() {
    return async.series([
      await this.migrateFoodItems(),
      await this.migrateUnits(),
      await this.migrateSchools(),
      await this.migrateRoles(),
      await this.migrateUsers(),
    ]);
  }

  async migrateFoodItems() {
    return this.foodItemsSeeder
      .migrate()
      .then((completed) => {
        if (completed === 0) {
          this.console.log('No migrations were found for food items');
        } else {
          this.console.log('Successfully completed seeding food items');
        }

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.console.log('Failed seeding food items');
        Promise.reject(error);
      });
  }


  async migrateUnits() {
    return this.unitsSeeder
      .migrate()
      .then((completed) => {
        if (completed === 0) {
          this.console.log('No migrations were found for units');
        } else {
          this.console.log('Successfully completed seeding units');
        }

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.console.log('Failed seeding units');
        Promise.reject(error);
      });
  }


  async migrateSchools() {
    return this.schoolsSeeder
      .migrate()
      .then((completed) => {
        if (completed === 0) {
          this.console.log('No migrations were found for schools');
        } else {
          this.console.log('Successfully completed seeding schools');
        }

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.console.log('Failed seeding schools');
        Promise.reject(error);
      });
  }


  async migrateUsers() {
    return this.usersSeeder
      .migrate()
      .then((completed) => {
        if (completed === 0) {
          this.console.log('No migrations were found for users');
        } else {
          this.console.log('Successfully completed seeding users');
        }

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.console.log('Failed seeding users');
        Promise.reject(error);
      });
  }

  async migrateRoles() {
    return this.rolesSeederService
      .migrate()
      .then((completed) => {
        if (completed === 0) {
          this.console.log('No migrations were found for system roles');
        } else {
          this.console.log('Successfully completed seeding system roles');
        }

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.console.log('Failed seeding system roles');
        Promise.reject(error);
      });
  }
}
