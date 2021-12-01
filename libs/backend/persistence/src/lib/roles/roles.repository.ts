import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ROLE_MODEL_NAME, RoleDocument } from './role.schema';
import { IRole } from '@fom/backend/domain';



@Injectable()
export class RolesRepository {
  constructor(@InjectModel(ROLE_MODEL_NAME)
              private readonly model: Model<RoleDocument>
  ) {}

  async create(payload: IRole){
    return new this.model(payload).save()
  }

  async findByName(name: string): Promise<IRole> {
    return this.model.findOne({name}).lean();
  }

  async getActiveRoles(): Promise<IRole[]> {
    return this.model.find().lean()
  }

  async getInactiveRoles():Promise<IRole[]> {
    return this.model.find({active: false}).lean()
  }

  async getAllRoles(): Promise<IRole[]> {
    return this.model.find()
  }

  async findById(id: string): Promise<IRole> {
    return this.model.findById(id).select('_id name cardinality active').lean()
  }

  async findActiveById(id: string): Promise<IRole> {
    return this.model.findOne({_id:id, active: true}).select('_id name cardinality active').lean()
  }
}
