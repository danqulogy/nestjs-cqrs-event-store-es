import { Injectable, Logger } from '@nestjs/common';
import { IRole } from '@fom/backend/domain';
import {RoleCardinality} from '@fom/backend/domain'
import { RolesRepository } from './roles.repository';
import { RoleDocument } from './role.schema';
import { FeLogger, environment } from '@fom/backend/common';
import { SystemUserRole } from '@fom/shared/api-dtos';


@Injectable()
export class RoleSeederService {

  ROLES: IRole[] = [
    { name: SystemUserRole.DEVELOPER,
      cardinality: RoleCardinality.One,
      permissions: []
    },
    { name: SystemUserRole.ADMINISTRATOR,
      cardinality: RoleCardinality.Many,
      permissions: []
    },
    { name: SystemUserRole.HEADMASTER,
      cardinality: RoleCardinality.Many,
      permissions: []
    },
    { name: SystemUserRole.BURSAR,
      cardinality: RoleCardinality.Many,
      permissions: []
    },

    { name: SystemUserRole.STORE_KEEPER,
      cardinality: RoleCardinality.Many,
      permissions: []
    },

    { name: SystemUserRole.MATRON,
      cardinality: RoleCardinality.Many,
      permissions: []
    },
  ]

  seedCount = 0
  constructor(private readonly repository: RolesRepository,
              private console: FeLogger,
              /*@Inject(SERVER_ENVIRONMENT) private environment: any*/) {
  }

  private async seed(): Promise<Array<Promise<RoleDocument>>>{

    return this.ROLES.map(async (role: IRole) => {
      return await this.repository
        .findByName(role.name)
        .then(async exist => {
          if (exist){
            return Promise.resolve(null)
          }

          return Promise.resolve(this.repository.create(role))
        })
        .catch(error => Promise.reject(error))
    })
  }

  async migrate(){
    let totalSeed = 0

    return await this.seed()
      .then(async created => {

        await Promise.all(created).then(roles => {
          const seeded = roles.filter(l => l !== null)
          totalSeed = seeded.length
        })

        if (totalSeed){
          this.console.log(`Seeded ${totalSeed} roles...`)
        }

        return Promise.resolve(totalSeed)
      })
      .catch(error => {
        Logger.log('An error occurred while seeding roles')
        return Promise.reject(error)
      })
  }

}
