import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class HolidaysInListDto {
  _id: string;
  title: string;
  date: Date;
  day: string;
  status: string;
}

export enum EventStatus {
  INCOMING = 'INCOMING',
  TODAY = 'TODAY',
  PASSED = 'PASSED',
}

export enum EventType {
  HOLIDAY = 'HOLIDAY',
  CUSTOM_EVENT = 'CUSTOM_EVENT',
}

export class AddHolidayDto {
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: Date;
}

export enum DaysEnum {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export class EditHolidayDto{
  @IsNotEmpty()
  @IsMongoId()
  id: string

  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: Date;
}
