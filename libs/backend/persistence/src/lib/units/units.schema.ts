import { Schema, Document } from "mongoose";

export const UNITS_MODEL_NAME = 'Units';

export const UnitsSchema =  new Schema({
  name: {type: String, required: true, unique: true},
});

export class IUnit{
  _id?: string
  name: string
}

export class UnitDocument extends Document implements IUnit{
  active: boolean;
  name: string;
}
