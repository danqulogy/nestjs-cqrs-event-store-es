import { Injectable, Logger } from '@nestjs/common';
import { UnitsRepository } from './units.repository';
import { IUnit, UnitDocument } from './units.schema';
import { FeLogger } from '@fom/backend/common';

@Injectable()
export class UnitsSeederService {
  UNITS: IUnit[] = [
    { name: 'rolls' },
    { name: 'pc' },
    { name: 'pcs' },
    { name: 'lengths' },
    { name: 'm' },
    { name: 'coil' },
    { name: 'cans' },
    { name: 'cyls' },
    { name: 'lot' },
    { name: 'gallons' },
    { name: 'boxes' },
  ];

  seedCount = 0;
  constructor(private readonly repository: UnitsRepository, private console: FeLogger) {}

  private async seed(): Promise<Array<Promise<UnitDocument>>> {
    return this.UNITS.map(async (unit: IUnit) => {
      return await this.repository
        .findByName(unit.name)
        .then(async (exist) => {
          if (exist) {
            return Promise.resolve(null);
          }

          return Promise.resolve(this.repository.create({ name: unit.name }));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  async migrate() {
    let totalSeed = 0;

    return await this.seed()
      .then(async (createdLanguages) => {
        await Promise.all(createdLanguages).then((language) => {
          const seeded = language.filter((l) => l !== null);
          totalSeed = seeded.length;
        });

        if (totalSeed) {
          this.console.log(`Seeded ${totalSeed} units...`);
        }

        return Promise.resolve(totalSeed);
      })
      .catch((error) => {
        Logger.log('An error occurred while seeding units');
        return Promise.reject(error);
      });
  }
}
