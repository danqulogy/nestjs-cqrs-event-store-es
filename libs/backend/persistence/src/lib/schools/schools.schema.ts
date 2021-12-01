import { Document, Schema } from 'mongoose';
import { ModelNamesEnum } from '../model-names.enum';
import { EnumToArray, Gender, GhanaRegionsEnum, SchoolEnrollmentStatus, SchoolGenderType } from '@fom/shared/api-dtos';

export const SCHOOL_MODEL_NAME = ModelNamesEnum.SCHOOL_MODEL_NAME;

export const HeadTeacherSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String
})

export const SchoolsSchema = new Schema(
  {
    name: { type: String, required: true },
    genderType: {type: String, enum: EnumToArray(SchoolGenderType)},
    postalAddress: {type: String},
    enrollmentKey: { type: String, unique: true },
    region: {type: String},
    town: {type: String},
    headTeacher: {type: HeadTeacherSchema},
    dispatched: {type: Boolean, default: false},
    totalNumberOfStudents: {type: Number, default: 0},
    totalNumberOfDayStudents: {type: Number, default: 0},
    totalNumberOfBoardingStudents: {type: Number, default: 0},
    enrollmentStatus: {type: String, enum: EnumToArray(SchoolEnrollmentStatus), default: SchoolEnrollmentStatus.NOT_ENROLLED}
  },
  { minimize: false, selectPopulatedPaths: true, timestamps: true }
);

export interface IHeadTeacherInfo{
  _id?: string
  name: string
  phoneNumber: string
  email: string
}


export interface ISchool {
  _id?: string
  name: string
  genderType: SchoolGenderType
  postalAddress: string
  enrollmentKey: string
  region: string | GhanaRegionsEnum
  town: string
  headTeacher: IHeadTeacherInfo
  dispatched?: boolean
  enrollmentStatus?: SchoolEnrollmentStatus
  totalNumberOfStudents?: number
  totalNumberOfDayStudents?: number
  totalNumberOfBoardingStudents?: number
}



export class SchoolDocument extends Document implements ISchool {
  enrollmentKey: string;
  name: string;
  region: string;
  town: string;
  headTeacher: IHeadTeacherInfo;
  genderType: SchoolGenderType;
  postalAddress: string;
  dispatched: boolean
  enrollmentStatus: SchoolEnrollmentStatus
  totalNumberOfBoardingStudents: number;
  totalNumberOfDayStudents: number;
  totalNumberOfStudents: number;
}
