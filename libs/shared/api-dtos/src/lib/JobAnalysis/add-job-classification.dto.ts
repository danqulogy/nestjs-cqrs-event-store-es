import { IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GradeClass, JobGradeDto } from './job-classification.types';

export class JobClassificationDto{
  _id: string
  name: string
  grade: string| GradeClass
  _levels: JobGradeDto[]
}

export class AddJobClassificationDto{
  @IsNotEmpty()
  name: string

  @IsIn(['A', 'B', 'C', 'D', 'E', 'F'])
  @IsString()
  grade: any
}

export class EditJobClassificationDto{

  @IsNotEmpty()
  @IsMongoId()
  _id: string

  @IsNotEmpty()
  name: string

  @IsIn(['A', 'B', 'C', 'D', 'E', 'F'])
  @IsString()
  grade: any
}

export class ChangeJobLevelDto{

  @IsNotEmpty()
  jobClassificationId: string

  @IsNotEmpty()
  @IsMongoId()
  jobGradeId: string

  @IsNotEmpty()
  @IsNumber()
  newLevel: number;
}
