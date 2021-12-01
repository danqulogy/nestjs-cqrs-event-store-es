import { ModelId } from '../Common';
import { isEmpty } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { DaysEnum, EventStatus, EventType } from '@fom/shared/api-dtos';


export interface IEvent {
  _id?: string;
  title: string;
  isFullDay: boolean;
  startDate: Date;
  endDate?: Date;
  type: string | EventType;
  status?: string | EventStatus;
  notes?: string;
  createdById?: string;
}

export class Event {
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get isFullDay() {
    return this._isFullDay;
  }
  get startDate() {
    return this._startDate;
  }
  get endDate() {
    return this._endDate;
  }
  get type() {
    return this._type;
  }
  get status() {
    return this.getStatus();
  }
  get notes() {
    return this._notes;
  }
  get createdById() {
    return this._createdById;
  }

  private constructor(data: IEvent) {
    this._id = data._id ? ModelId.create(data._id) : null;
    this._title = data.title;
    this._isFullDay = data.isFullDay;
    this._startDate = data.startDate;
    this._type = data.type;

    this._notes = data.notes || null;
    this._createdById = ModelId.create(data.createdById);

    if (data.isFullDay) {
      this._endDate = this._startDate;
    } else {
      if (isEmpty(data.endDate)) {
        throw new BadRequestException();
      }
      this._endDate = data.endDate;
    }
  }
  private _id: ModelId;

  private _title: string;

  private _isFullDay: boolean;

  private _startDate: Date;

  private _endDate: Date;

  private _type: string | EventType;

  private _status = this.getStatus();

  private _notes: string;

  private _createdById: ModelId;

  static create(data: IEvent) {
    return new Event(data);
  }

  static getDay(event: IEvent){
    const dateIndex = moment(new Date(event.startDate)).day()
    switch (dateIndex) {
      case DaysEnum.SUNDAY:
        return 'Sunday'
      case DaysEnum.MONDAY:
        return 'Monday';
      case DaysEnum.TUESDAY:
        return 'Tuesday';
      case DaysEnum.WEDNESDAY:
        return 'Wednesday';
      case DaysEnum.THURSDAY:
        return 'Thursday';
      case DaysEnum.FRIDAY:
        return 'Friday';
      case DaysEnum.SATURDAY:
        return 'Saturday';
    }
  }

  private calculateHolidayStatus() {}

  getStatus() {
    if (moment(new Date(this.endDate)).isSame(moment(), 'day')) {
      return EventStatus.TODAY;
    }

    const isBefore = moment(new Date(this.endDate)).isBefore(moment(), 'day');
    return isBefore ? EventStatus.PASSED : EventStatus.INCOMING;
  }

  setTitle(title: string) {
    this._title = title
  }

  setStartDate(date: Date) {
    this._startDate = this._endDate = date
  }
}
