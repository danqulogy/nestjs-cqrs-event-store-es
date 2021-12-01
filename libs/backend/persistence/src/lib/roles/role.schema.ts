import { Document, Schema } from 'mongoose';
import { IRole } from '@fom/backend/domain';

export const ROLE_MODEL_NAME = 'Role'

export const RoleSchema = new Schema({
  name: {type: String,  required: true},
  cardinality: {type: Number, required: true, default: 1},
  permissions: {type: [String]},
  active: {type: Boolean, default: true}
})

RoleSchema.index({name: 1})

export class RoleDocument extends Document implements IRole{
  cardinality: number
  name: string
  permissions: string[]
  active: boolean
}
