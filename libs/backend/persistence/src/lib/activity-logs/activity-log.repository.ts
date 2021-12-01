import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ACTIVITY_LOG_MODEL, ActivityLogDocument, IActivityLog } from './activity-log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@fom/backend/domain';

@Injectable()
export class ActivityLogRepository {
  constructor(
    @InjectModel(ACTIVITY_LOG_MODEL)
    private model: Model<ActivityLogDocument>
  ) {}

  async persist(payload: IActivityLog) {
    return new this.model(payload).save();
  }

  async writeLog(payload: Partial<IActivityLog>, user: IUser) {
    payload.userId = user._id;
    return new this.model(payload).save();
  }

  async getAll() {
    return this.model.find().lean();
  }
}
