import {
  CommandHandlerNotFoundException,
  IQuery,
  IQueryHandler,
  QueryHandler,
  QueryHandlerNotFoundException,
} from '@nestjs/cqrs'
import { RolesRepository } from '@fom/backend/persistence';
import { AuthFacadeService } from '../auth-facade.service';

export class GetRolesListQuery implements IQuery{
  constructor(public readonly status: string) {

  }
}

@QueryHandler(GetRolesListQuery)
export class GetRolesListQueryHandler implements IQueryHandler<GetRolesListQuery>{
  constructor(private repository: RolesRepository,
              private facade: AuthFacadeService) {
  }

  async execute(query: GetRolesListQuery): Promise<any> {
    const {status}= query

    let results = []
    if (status === null) {
      results = await this.repository.getAllRoles()
    }

    if (status === 'active') {
     results = await this.repository.getActiveRoles()
    }

    if (status === 'inactive') {
      results = await this.repository.getInactiveRoles()
    }

    return results.map(e => this.facade.convertToRoleDto(e))


  }

}
