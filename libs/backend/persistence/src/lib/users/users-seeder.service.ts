import { Injectable, Logger } from '@nestjs/common'
import { Types } from 'mongoose'
import { IRole, IUser, Password } from '@fom/backend/domain';
import { UsersRepository } from './users.repository';
import { FeLogger } from '@fom/backend/common';
import { DefaultAppSettings, SystemUserRole } from '@fom/shared/api-dtos';
import { RoleDocument, RolesRepository } from "../roles";

const {ObjectId} = Types
@Injectable()
export class UsersSeederService {

  ROLES: IUser[] = [
    {
      name: 'Bernard White',
      _roleName: SystemUserRole.DEVELOPER,
      email: 'bernard@moe.com',
      password: 'password123!',
      active: true,
      isVerified: true,
      roleId: ''
    },
    {
      name: 'Augustine Ofori',
      _roleName: SystemUserRole.ADMINISTRATOR,
      email: 'augustine@moe.com',
      password: 'password123!',
      active: true,
      isVerified: true,
      roleId: ''
    },

    {
      name: 'Opoku Mensah',
      _roleName: SystemUserRole.ADMINISTRATOR,
      email: 'opoku@moe.com',
      password: 'password123!',
      active: true,
      isVerified: true,
      roleId: ''
    },
  ]

  seedCount = 0
  constructor(private readonly rolesRepository: RolesRepository,
              private readonly usersRepository: UsersRepository,
              private console: FeLogger) {}

  private async seed(): Promise<Array<Promise<RoleDocument>>>{

    return this.ROLES.map(async (user: IUser) => {
      return await this.rolesRepository
        .findByName(user._roleName)
        .then(async (role:IRole) => {
          if (!role){
            this.console.log(`Role name -${user._roleName} not found in database. Therefore cannot create user - ${user.displayName} for ${user._roleName} role. [SKIPPING]...`)
            return Promise.resolve(null)
          }

          // check if user with same email does exist
          const exist = await this.usersRepository.findActiveUserByEmail(user.email)
          if (exist){ return Promise.resolve(null) }

          user.roleId = role._id
          user.password = (Password.generateHash(user.password)).value

          return Promise.resolve(this.usersRepository.seed(user))
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
          this.console.log(`Seeded ${totalSeed} users...`)
        }

        return Promise.resolve(totalSeed)
      })
      .catch(error => {
        Logger.log('An error occurred while seeding users')
        return Promise.reject(error)
      })
  }

}
