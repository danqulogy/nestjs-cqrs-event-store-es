import { Injectable } from '@nestjs/common';
import { IRole, IUser } from '@fom/backend/domain';
import { RoleDto, SystemUserRole, UserInListDto } from '@fom/shared/api-dtos';

@Injectable()
export class AuthFacadeService{


  convertToRoleDto(role: IRole){
    return {
      _id: role._id,
      name: role.name,
      cardinality: role.cardinality,
      permissions: role.permissions,
      active: role.active
    } as RoleDto
  }

  convertToUserDto(user: IUser): UserInListDto{
    return {
      _id: user._id,
      name: user.name,
      active: user.active,
      email: user.email,
      isVerified: user.isVerified,
      isActivated: !!user.password,
      role: this.convertToRoleDto(user._role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  getEmployeeFullName(firstName: string, middleName: string, surname: string)  {
    const placeHolder = 'MIDDLE_NAME_PLACEHOLDER'
    const simpleName =  `${firstName.trim()} ${placeHolder} ${surname.trim()}`
    const midName = middleName?middleName.trim(): ''
    return simpleName.replace(placeHolder, midName)
  }

  getEmployeeFullNameForInitials (firstName, middleName, surname) {
    const fullName = this.getEmployeeFullName(firstName, middleName, surname)
    const limitedNameSegments = fullName.split(' ', 3)
    return limitedNameSegments.join(' ')
  }




  isAdmin(authUser: IUser){
    return authUser._role.name === SystemUserRole.ADMINISTRATOR
  }

  isExecutive(authUser: IUser){
    return authUser._role.name === SystemUserRole.HEADMASTER
  }
}
