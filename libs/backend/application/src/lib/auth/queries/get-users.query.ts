import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UsersRepository } from '@fom/backend/persistence';
import { AuthFacadeService } from '../auth-facade.service';

export class GetUsersQuery implements IQuery {
}

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery>{
  constructor(private readonly usersRespository: UsersRepository,
              private facade: AuthFacadeService) {
  }

  async execute(query: GetUsersQuery): Promise<any> {
    const results = await this.usersRespository.getAllUsers()
    return results.map(u  => this.facade.convertToUserDto(u))
  }

}
