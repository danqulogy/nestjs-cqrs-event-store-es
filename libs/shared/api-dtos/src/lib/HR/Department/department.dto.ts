export class DepartmentDto {
  _id: string
  code: string
  name: string
  active: boolean
  departmentHead: {
    id: string
    fullName: string,
    fullNameInitials: string
  }
}

export enum DepartmentCodeEnum{
  MANAGEMENT = 'MGT',
  HR_ADMINISTRATION = 'HRM',
  MARKETING = 'MKT',
  ENGINEERING ='ENG',
  FINANCE ='FIN'
}

export enum DepartmentNameEnum{
  MANAGEMENT = 'Management',
  HR_ADMINISTRATION = 'Human Resource & Administration',
  MARKETING = 'Sales & Marketing',
  ENGINEERING ='Engineering',
  FINANCE ='Stores & Finance'
}
