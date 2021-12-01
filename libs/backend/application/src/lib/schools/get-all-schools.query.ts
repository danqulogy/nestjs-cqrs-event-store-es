import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SchoolsRepository } from '@fom/backend/persistence';

export class GetAllSchoolsQuery {
}

@QueryHandler(GetAllSchoolsQuery)
export class GetAllSchoolsQueryHandler implements IQueryHandler<GetAllSchoolsQuery>{

  constructor(private repository: SchoolsRepository) {
  }

  execute(query: GetAllSchoolsQuery): Promise<any> {
    return  this.repository.findAll()
  }

}
