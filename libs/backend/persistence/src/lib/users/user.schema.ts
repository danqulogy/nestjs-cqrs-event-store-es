import { Document, Schema } from 'mongoose'
import { IUser } from '@fom/backend/domain'

import { ROLE_MODEL_NAME } from "../roles/role.schema";
import { SCHOOL_MODEL_NAME } from '../schools';

export const USER_MODEL_NAME = 'User'


export const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  roleId: {type: String, required: true},
  password: {type: String},
  isVerified: {type: Boolean, default: false},
  verifyToken:{type: String},
  verifyExpires: {type: Date},
  resetToken: {type: String},
  resetExpires: {type: Date},
  schoolId: {type: String},
  active: {type: Boolean, default: true},
}, {timestamps: true})

UserSchema.virtual('_role', {
  ref: ROLE_MODEL_NAME,
  localField: 'roleId',
  foreignField: '_id',
  justOne: true
})

UserSchema.virtual('_school', {
  ref: SCHOOL_MODEL_NAME,
  localField: 'schoolId',
  foreignField: '_id',
  justOne: true
})


export class UserDocument extends Document implements IUser{
  name: string;
  email: string
  password: string
  roleId: string
  active: boolean
  isVerified: boolean
}
