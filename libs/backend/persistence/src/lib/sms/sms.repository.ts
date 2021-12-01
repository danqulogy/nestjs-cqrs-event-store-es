import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SMS_MODEL, SmsDocument, ISms } from './sms.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@fom/backend/domain';

@Injectable()
export class SmsRepository {
  constructor(
    @InjectModel(SMS_MODEL)
    private model: Model<SmsDocument>
  ) {}

  async persist(payload: ISms) {
    return new this.model(payload).save();
  }

  async writeLog(payload: Partial<ISms>, user: IUser) {
    payload.userId = user._id;
    return new this.model(payload).save();
  }

  async getAll() {
    return this.model.find().lean();
  }
}
