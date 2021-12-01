import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ISchool, SCHOOL_MODEL_NAME, SchoolDocument } from './schools.schema';

import { EnrollSchoolDto, SchoolEnrollmentStatus } from '@fom/shared/api-dtos';

@Injectable()
export class SchoolsRepository {
  constructor(
    @InjectModel(SCHOOL_MODEL_NAME)
    private model: Model<SchoolDocument>,
    @InjectConnection() private connection: Connection
  ) {}

  async delete(schoolId: string) {
    return this.model.findByIdAndDelete(schoolId as any);
  }

  async findAll(): Promise<ISchool[]> {
    return this.model.find().lean();
  }

  async findById(id: string): Promise<ISchool> {
    return this.model.findById(id).lean();
  }

  async findByEnrollmentKey(code: string): Promise<ISchool> {
    return this.model.findOne({ enrollmentKey: code }).lean();
  }

  async saveChanges(school: ISchool): Promise<ISchool> {
    return this.model.findByIdAndUpdate(school._id, school).lean();
  }

  async seedSchool(payload: ISchool): Promise<ISchool> {
    let session = null;
    try {
      return this.connection
        .startSession()
        .then((_session) => {
          session = _session;
          session.startTransaction();
          return this.model.create([payload], { session });
        })
        .then(() => session.commitTransaction())
        .then(() => session.endSession())
        .catch((err) => console.log(err));
    } catch (e) {
      throw new BadRequestException(
        'An error occurred while saving school info',
        e
      );
    }
  }

  async findUndispatchedSchools(): Promise<ISchool[]> {
    return this.model.find({ dispatched: false });
  }

  // async registerMember(payload: RegisterMemberDto) {
  //   return this.model.create([payload]);
  // }

  // async updateMember(payload: UpdateMemberInfoDto) {
  //   return this.model.findByIdAndUpdate(payload._id, payload)
  // }

  // async checkPrivateEmailExist(privateEmail: string): Promise<IMember> {
  //   return this.model.findOne({privateEmail}).lean()
  // }
  async markAsDispatched(id: string) {
    return this.model.findByIdAndUpdate(id, {
      dispatched: true,
      enrollmentStatus: SchoolEnrollmentStatus.PENDING,
    });
  }

  async markAsEnrolled(id: string, payload: EnrollSchoolDto) {
    return this.model.findByIdAndUpdate(id, {
      dispatched: true,
      enrollmentStatus: SchoolEnrollmentStatus.ENROLLED,
      totalNumberOfStudents: payload.totalNumberOfStudents,
      totalNumberOfBoardingStudents: payload.totalNumberOfBoardingStudents,
      totalNumberOfDayStudents: payload.totalNumberOfDayStudents
    });
  }
}
