import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { USER_MODEL_NAME, UserDocument } from '@fom/backend/persistence';
import { IUser, User } from '@fom/backend/domain';
import { UserWithOnlyNameDto } from '@fom/shared/api-dtos';

export class GetUserFirstNameByIdQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetUserFirstNameByIdQuery)
export class GetUserFirstNameByIdQueryHandler implements IQueryHandler<GetUserFirstNameByIdQuery>{
  constructor(@InjectModel(USER_MODEL_NAME)
              private readonly model:Model<UserDocument>) {
  }

  async execute(query: GetUserFirstNameByIdQuery): Promise<any> {
    const exist:IUser = await this.model.findById(query.userId).lean()
    if(!exist){
      throw new NotFoundException('User not found')
    }

    const user = new User(exist, true)

    if(user.isPasswordSet()){
      throw new BadRequestException("This account's setup has already been completed. " +
        "If you have forgotten your password, kindly use the forget password form to request a password request. " +
        "For additional support, please contact your administrator.")
    }

    return this.toDto(user)
  }

  toDto(user: User){
    const dto = new UserWithOnlyNameDto()
    dto.id = user.id.value
    dto.displayName = user.name
    return dto
  }

}
