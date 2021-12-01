export interface IRole {
  _id?: string
  name: string
  cardinality: number
  permissions: string[]
  active?: boolean
}
