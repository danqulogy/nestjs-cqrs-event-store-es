export class RoleDto {
  _id: string
  name: string
  cardinality: number
  defaultApp: string
  allowedClientApps: string[]
  permissions: string[]
  active?: boolean
}
