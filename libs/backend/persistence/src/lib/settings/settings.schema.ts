import { Document, Schema } from 'mongoose';
import { ModelNamesEnum } from "../model-names.enum";

export const SETTINGS_MODEL_NAME = ModelNamesEnum.SETTINGS_MODEL_NAME

export const SettingsSchema = new Schema({
  currentDate: Date,
  currentPeriod: Number,
  currentYear: Number,
  currentMonthName: String,
  currentFiscalYearId: String,
  firstMonthOfFiscalYearIndex: {type: Number, default: 0},
  firstMonthOfFiscalYearName: String,
  beginningBalanceDate: {type: Date, default: new Date(2021,0, 1)},
  closeBooks: {type: Boolean, default: false},
  defaultSalesAccountId: String,
  defaultServiceAndInstallationAccountId: String,
  defaultPurchasesAccountId: String,
  defaultInventoryAccountId: String,
  defaultRetainedEarningsAccountId: String,
  defaultPaymentTermId: String,
  baseCurrencyId: String,
  defaultOpeningBalanceAdjustmentAccountId: String,
  paymentReceiptNumber: Number,
  companyName: String,
  businessRegistrationId: String,
  companyAddress: String,
  phoneNumbers: String,
  logoUrl: String,
  website: String,
  companyEmail: String,
  expenseNumber: Number,
  accountantMasterPassword: String,
  billPaymentReceiptNumber: Number,
  weekDayOvertimeRate: Number,
  weekEndOvertimeRate: Number
})

SettingsSchema.virtual('_defaultRetainedEarningsAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultRetainedEarningsAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultServiceAndInstallationAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultServiceAndInstallationAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_baseCurrency', {
  ref: ModelNamesEnum.CURRENCY_MODEL_NAME,
  localField: 'baseCurrencyId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultSalesAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultSalesAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultPurchasesAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultPurchasesAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultInventoryAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultInventoryAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultPaymentTerm', {
  ref: ModelNamesEnum.PAYMENT_TERMS_MODEL_NAME,
  localField: 'defaultPaymentTermId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_defaultOpeningBalanceAdjustmentAccount', {
  ref: ModelNamesEnum.CHARTS_OF_ACCOUNTS,
  localField: 'defaultOpeningBalanceAdjustmentAccountId',
  foreignField: '_id',
  justOne: true
})

SettingsSchema.virtual('_currentFiscalYear', {
  ref: ModelNamesEnum.FISCAL_YEAR_MODEL_NAME,
  localField: 'currentFiscalYearId',
  foreignField: '_id',
  justOne: true
})


export interface ISettings{
  _id?: string
  currentDate: Date
  currentPeriod: number
  currentYear: number
  currentMonthName?: string
  currentFiscalYearId?: string
  firstMonthOfFiscalYearIndex: number
  firstMonthOfFiscalYearName: string
  beginningBalanceDate: Date
  closeBooks: boolean
  defaultSalesAccountId: string
  defaultPurchasesAccountId: string
  defaultInventoryAccountId: string
  defaultServiceAndInstallationAccountId: string
  defaultPaymentTermId: string
  baseCurrencyId: string
  defaultOpeningBalanceAdjustmentAccountId: string
  defaultRetainedEarningsAccountId: string
  paymentReceiptNumber: number
  companyName: string
  businessRegistrationId: string
  companyAddress: string
  phoneNumbers: string
  logoUrl: string
  website: string
  companyEmail: string
  expenseNumber: number
  billPaymentReceiptNumber: number
  accountantMasterPassword: string
  weekDayOvertimeRate: number,
  weekEndOvertimeRate: number
}

export class SettingsDocument extends Document implements ISettings{
  currentMonthName?: string
  accountantMasterPassword: string;
  companyName: string;
  businessRegistrationId: string;
  currentDate: Date;
  currentPeriod: number;
  firstMonthOfFiscalYearIndex: number
  firstMonthOfFiscalYearName: string
  beginningBalanceDate: Date
  closeBooks: boolean;
  defaultInventoryAccountId: string;
  defaultPurchasesAccountId: string;
  defaultSalesAccountId: string;
  defaultPaymentTermId: string;
  baseCurrencyId: string;
  defaultOpeningBalanceAdjustmentAccountId: string;
  currentFiscalYearId: string;
  paymentReceiptNumber: number;
  billPaymentReceiptNumber: number;
  companyAddress: string;
  companyEmail: string;
  logoUrl: string;
  phoneNumbers: string;
  website: string;
  expenseNumber: number;
  currentYear: number;
  defaultServiceAndInstallationAccountId: string;
  defaultRetainedEarningsAccountId: string;
  weekDayOvertimeRate: number;
  weekEndOvertimeRate: number;

}
