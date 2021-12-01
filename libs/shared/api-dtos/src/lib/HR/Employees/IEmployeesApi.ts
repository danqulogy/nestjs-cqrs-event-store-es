import {
  EditAddtionalPersonalInfoDto,
  EditEmployeeBasicInfoDto, EducationDto,
  ModelIdParamDto,
  RegisterMemberDto, UpdateEmergencyContactsDto, WorkExperienceDto
} from '@fom/shared/api-dtos';

export interface IEmployeesApi {
  getCurrentEmployees(): any
  register(payload: RegisterMemberDto, user?: any)

  editBasicInfo(dto: EditEmployeeBasicInfoDto, id?: string, user?: any)
  editAdditionalPersonalInfo(dto: EditAddtionalPersonalInfoDto, id?:string, user?: any)

  resign()

  getEmployeeById(modelId: ModelIdParamDto|string);

  addEducation(dto: EducationDto, employeeId?: string, user?: any)

  updateEducationalHistory(payload: EducationDto[], employeeId?: string, actor?: any)

  getEmployeeJobStatuses(employeeId: string, actor?: any )

  updateEmergencyContacts(payload: UpdateEmergencyContactsDto, actor?: any )

  addWorkExperience(payload: WorkExperienceDto,
                    employeeId?: string,
                    user?: any)

  updateWorkExperienceHistory(payload: WorkExperienceDto[],
                              employeeId?: string,
                              actor?: any)
}
