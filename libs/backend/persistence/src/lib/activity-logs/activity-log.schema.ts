import { Document, Schema } from 'mongoose';
import { ActivityType, ActivityTypesList } from '@fom/backend/domain';
import { ModelNamesEnum } from '../model-names.enum';

export const ACTIVITY_LOG_MODEL = 'ActivityLog'

export const ActivityLogSchema = new Schema({
  userId: {type: String, required: true},
  employeeId: {type: String},
  content: {type: String},
  formattedContent: {type: String, required: true},
  type: {type: String, enum:[...ActivityTypesList], required: true}
}, {timestamps: true, autoCreate: true})

ActivityLogSchema.virtual('_user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})


export interface IActivityLog {
  _id?: string
  userId: string
  content?: string
  formattedContent: string
  type: ActivityType
}


export class ActivityLogDocument extends Document implements IActivityLog{
  content: string
  type: ActivityType
  userId: string;
  formattedContent: string;
}
