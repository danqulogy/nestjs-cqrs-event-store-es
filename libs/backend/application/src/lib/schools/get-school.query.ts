import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SchoolsRepository } from '@fom/backend/persistence';

export class GetSchoolByEnrollmentKeyQuery {
  constructor(public readonly key: string) {
  }
}

@QueryHandler(GetSchoolByEnrollmentKeyQuery)
export class GetSchoolByEnrollmentKeyQueryHandler implements IQueryHandler<GetSchoolByEnrollmentKeyQuery>{

  constructor(private repository: SchoolsRepository) {
  }

  execute(query: GetSchoolByEnrollmentKeyQuery): Promise<any> {
    return  this.repository.findByEnrollmentKey(query.key)
  }

}
