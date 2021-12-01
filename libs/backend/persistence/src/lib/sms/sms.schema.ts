import { Document, Schema } from 'mongoose';
import { ActivityType, ActivityTypesList } from '@fom/backend/domain';
import { ModelNamesEnum } from '../model-names.enum';

export const SMS_MODEL = 'sms'

const SmsRecipientSchema = new Schema({
  phoneNumber: String,
  isSent: { type: Boolean, defualt: false }
})

export const SmsSchema = new Schema({
  userId: {type: String, required: true},
  message: {type: String},
  recipients: {type: [SmsRecipientSchema]},
  successCount: {type: Number, default: 0},
  errorCount: {type: Number, default: 0},
}, {timestamps: true, autoCreate: true})

SmsSchema.virtual('_user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

export interface ISmsRecipient{
  _id?: string
  phoneNumber: string
  isSent: boolean
}

export interface ISms {
  _id?: string
  userId: string
  message: string
  recipients: ISmsRecipient[]
  successCount: number
  errorCount: number
}


export class SmsDocument extends Document implements ISms{
  message: string;
  recipients: ISmsRecipient[];
  type: ActivityType;
  userId: string;
  errorCount: number;
  successCount: number;

}
