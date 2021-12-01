export enum JobType{
  PERMANENT = 'Permanent/Full Time',
  TEMPORAL = 'Temporal(Contract)',
  CONSULTANT = 'Consultant'
}

export const JobTypeArrayList = [JobType.PERMANENT, JobType.TEMPORAL, JobType.CONSULTANT]

export const JobTypeArrayString = `${JobType.PERMANENT}, ${JobType.TEMPORAL}, and ${JobType.CONSULTANT}`