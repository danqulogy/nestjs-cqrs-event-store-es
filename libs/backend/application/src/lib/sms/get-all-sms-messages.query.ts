import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {  SmsRepository } from '@fom/backend/persistence';

export class GetAllSmsMessagesQuery {
}

@QueryHandler(GetAllSmsMessagesQuery)
export class GetAllSmsMessagesQueryHandler implements IQueryHandler<GetAllSmsMessagesQuery>{

  constructor(private repository: SmsRepository) {
  }

  execute(query: GetAllSmsMessagesQuery): Promise<any> {
    return  this.repository.getAll()
  }

}
