import { UserInListDto } from "@fom/shared/api-dtos";

// export interface User {
//   _id?: string
//   photoUrl?: string
//   employeeId: string
//   displayName: string
//   email: string
//   roleId: string
//   password?: string
//   fpc?: string
//   isVerified?: boolean
//   isEmployee?: boolean
//   employee?: Employee
//   accessStatus: boolean
//   createdAt: string
//
//   // Derivatives
//   _departmentName?: string
//   role?: string
//   _permissions?: any[]
// }

export interface IAuthCredentials {
  strategy: string
  email: string
  password: string
}

export function createUser(params: Partial<UserInListDto>) {
  return {

  } as UserInListDto;
}
