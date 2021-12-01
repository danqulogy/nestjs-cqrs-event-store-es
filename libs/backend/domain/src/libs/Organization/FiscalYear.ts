export interface IFiscalYear {
  _id?: string
  year: number
  startDate: Date
  endDate: Date
  isActive: boolean
  isBeginningYear?: boolean
}
