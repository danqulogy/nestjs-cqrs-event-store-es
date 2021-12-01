import { IsIn, IsNotEmpty } from 'class-validator'

export class ActiveStatusQueryParamsDto {
  @IsNotEmpty({ message: '"active" query parameter is required' })
  @IsIn(['active', 'inactive', 'all'], {
    message: '"active" query param should be one of active, inactive or all',
  })
  status: 'active' | 'inactive' | 'all'
}


