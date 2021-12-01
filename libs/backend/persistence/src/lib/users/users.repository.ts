import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL_NAME, UserDocument } from './user.schema';
import { IUser, User } from '@fom/backend/domain';
import { RegisterUserDto } from '@fom/shared/api-dtos';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private model: Model<UserDocument>
  ) {}

  async findTotalActiveUsersByRoleId(roleId: string): Promise<number> {
    return (await this.model.find({ roleId, active: true }).select('_id')).length;
  }

  async findActiveUserByRoleId(roleId): Promise<IUser> {
    return this.model.findOne({ roleId, active: true }).populate([
      {
        path: '_member',
      },
    ]);
  }

  async persistAndMarkActive(payload: IUser) : Promise<IUser>{
    const doc = new this.model(payload);
    await doc.save();
    return doc;
  }

  async persist(user: User, isExisting = false): Promise<IUser> {
    const data = this.convertUserToJson(user);

    if (isExisting) {
      return this.model.findByIdAndUpdate(data._id, data).lean();
    }

    const doc = new this.model(data);
    await doc.save();
    return doc;
  }

  seed(data: IUser) {
    // check dups
    return new this.model(data).save();
  }

  convertUserToJson(user: User): any {
    return {
      _id: user.id ? user.id.value : null,
      name: user.name,
      roleId: user.roleId.value,
      email: user.email.value,
      password: user.password.value ? user.password.value : null,
      active: user.active,
      isVerified: user.isVerified,
      verifyToken: user.verifyToken,
      verifyExpires: user.verifyExpires.value,
      resetToken: null,
      resetExpires: null,
    } as IUser;
  }

  async checkIfEmployeeAlreadyExist(employeeId: string): Promise<IUser> {
    return this.model.findOne({ memberId: employeeId }).lean();
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return this.model.findOne({ email })
      .populate('_role')
      .lean();
  }

  async findUserByMemberId(memberId: string): Promise<IUser> {
    return this.model.findOne({ memberId: memberId }).lean();
  }

  async findUserByEmployeeId(employeeId: string): Promise<IUser> {
    return this.model.findOne({ memberId: employeeId }).populate('_role').lean();
  }

  async findActiveUserByEmail(email: string): Promise<IUser> {
    return this.model.findOne({ email, active: true })
      .populate('_role').lean();
  }

  async findActiveUserById(userId: string): Promise<IUser> {
    return this.model.findOne({ _id: userId, active: true })

      .populate('_role').lean();
  }

  async findUserByVerifyToken(verifyToken: string): Promise<IUser> {
    return this.model.findOne({ verifyToken }).lean();
  }

  async verifyUser(_id: string) {
    return this.model.findByIdAndUpdate(_id, { isVerified: true }).lean();
  }

  async findUserById(userId: string): Promise<IUser> {
    return this.model.findById(userId)
      .populate('_role')
      .populate('_school')
      .lean();
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.model
      .find({ isEmployee: true })
      .populate('_role')
      .populate('_school')
      .lean();
  }

  async delete(_id: string) {
    return this.model.findByIdAndDelete(_id);
  }

  async getSystemUser(roleId: string) {
    return this.model.findOne({roleId })
      .populate('_role')
      .populate('_school')
      .lean()
  }
}
