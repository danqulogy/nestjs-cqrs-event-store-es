import { DepartmentDto, UserInListDto } from "@fom/shared/api-dtos";
export interface Activity {
  _id?: string
  type: string
  actorId: string
  actor: UserInListDto
  message: string
  category: string
  createdAt: Date
  _department: DepartmentDto
}

export function createActivityLog(params: Partial<Activity>) {
  return {

  } as Activity;
}
