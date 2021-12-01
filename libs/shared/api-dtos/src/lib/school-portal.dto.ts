import { IsNotEmpty } from 'class-validator';

export class EnrollSchoolDto{
  @IsNotEmpty({message: 'Enrollment Key is required'})
  enrollmentKey: string

  @IsNotEmpty({message: 'Please provide total number of students'})
  totalNumberOfStudents: number

  @IsNotEmpty({message: 'Please provide total number of day students'})
  totalNumberOfDayStudents: number

  @IsNotEmpty({message: 'Please provide total number of boarding students'})
  totalNumberOfBoardingStudents: number

  @IsNotEmpty({message: 'Administrative password is required'})
  password: string
}
