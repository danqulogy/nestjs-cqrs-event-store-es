import { IRole } from './IRole';

export class IUser {
  _id?: string
  name: string
  email: string
  roleId: string
  schoolId?: string
  password?: string
  isVerified?: boolean
  verifyToken?: string
  verifyExpires?: Date
  resetToken?: string
  resetExpires?: Date
  active?: boolean
  displayName?: string
  _fullName?: string
  _roleName?: string
  _role?: IRole
  createdAt?: string
  updatedAt?: string
}
