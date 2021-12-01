import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUnit, UnitDocument, UNITS_MODEL_NAME } from './units.schema';

@Injectable()
export class UnitsRepository {
  constructor(
    @InjectModel(UNITS_MODEL_NAME)
    private model: Model<UnitDocument>,
  ) {}

  async create(payload: IUnit) {
    const {name}= payload
    return new this.model({name, active: true}).save()
  }

  async update(id: string, payload: Partial<IUnit>){
    return this.model.findByIdAndUpdate({_id:id}, payload, {new: true})
  }

  async delete(id: string){
    return this.model.findByIdAndDelete({_id: id})
  }


  async getById(id: string): Promise<IUnit>{
    return this.model.findById(id)
  }

  async findByName(name: string){
    return this.model.findOne({name})
  }

  async getAll(){
    return this.model
      .find()
      .sort({name: 1})
      .lean()
  }

  async getAllWithFilters(filter: string){
    let religions = await this.getAll()
    if (filter){
      religions = religions.filter(r => r.active === Boolean(filter))
    }
    return religions
  }
}
