import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitsRepository } from '@fom/backend/persistence';

export class GetAllUnitsQuery {
}

@QueryHandler(GetAllUnitsQuery)
export class GetAllUnitsQueryHandler implements IQueryHandler<GetAllUnitsQuery>{
  constructor(private repo: UnitsRepository) {
  }
  async execute(query: GetAllUnitsQuery): Promise<any> {
    return this.repo.getAll();
  }


}
