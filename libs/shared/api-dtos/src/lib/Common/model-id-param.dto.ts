import { IsMongoId, IsNotEmpty } from 'class-validator'

export class ModelIdParamDto{
  @IsNotEmpty()
  @IsMongoId({message: 'Invalid Id Param'})
  id: string
}
