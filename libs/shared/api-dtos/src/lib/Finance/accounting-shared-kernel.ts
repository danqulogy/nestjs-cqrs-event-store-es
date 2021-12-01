import {
  IsArray,
  IsBoolean, IsDate,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional
} from "class-validator";
import { CostingMethodsEnum } from './costing-methods.enum';
import { TaxTypeEnum } from "./tax-type-enum";
import { DiscountTypeEnum } from "./discount-type-enum";
import { ProjectDto } from '../Engineering/engineeting-shared-kernel';
import { MembersInListDto } from "../HR/Employees";
import { AddLeadNoteDto, NoteDto } from "../Leads";

export enum MonthNamesEnum {
  JANUARY ='January',
  FEBRUARY ='February',
  MARCH ='March',
  APRIL ='April',
  MAY ='May',
  JUNE ='June',
  JULY ='July',
  AUGUST ='August',
  SEPTEMBER ='September',
  OCTOBER ='October',
  NOVEMBER ='November',
  DECEMBER ='December',
}

export enum ItemTypeEnum{
  SERVICE = 'Service',
  INVENTORY = 'Inventory',
  NON_INVENTORY = 'Non-Inventory'
}

export enum OverdueInvoicesTimelineEnum{
  ALL= 'All overdue invoices',
  OVER_90 = 'Due over 90 days',
  OVER_120 ="Due over 120 days"
}

export interface ITopMovingItems {
  item: ItemInListDto
  totalAmountSold: number
  totalQuantitySold: number
}

export class UpdateAccountingSettingsDto{
  @IsNotEmpty()
  @IsMongoId({message: 'Settings ID not valid'})
  _id?: string

  @IsNotEmpty()
  @IsNumber()
  firstMonthOfFiscalYearIndex: number

  @IsNotEmpty()
  firstMonthOfFiscalYearName: string

  @IsNotEmpty()
  beginningBalanceDate: Date

  @IsNotEmpty()
  @IsBoolean()
  closeBooks: boolean;

  @IsNotEmpty()
  @IsMongoId({message: 'Default Inventory account ID not valid'})
  defaultInventoryAccountId: string;

  @IsNotEmpty()
  @IsMongoId({message: 'Default Purchase account ID not valid'})
  defaultPurchasesAccountId: string;

  @IsNotEmpty()
  @IsMongoId({message: 'Default Sales Account  ID not valid'})
  defaultSalesAccountId: string
}

export class AppSettingsDto{
  _id?: string
  currentDate: Date
  currentPeriod: number
  firstMonthOfFiscalYearIndex: number
  firstMonthOfFiscalYearName: string
  beginningBalanceDate: Date
  closeBooks: boolean;
  defaultInventoryAccountId: string;
  defaultPurchasesAccountId: string;
  defaultSalesAccountId: string
  _defaultSalesAccount: LedgerInListDto
  _defaultPurchasesAccount: LedgerInListDto
  _defaultInventoryAccount: LedgerInListDto
}

export enum DataSnapshotTimelineEnum{
  LAST_MONTH = 'Last Month',
  THIS_MONTH = 'This Month',
  FIRST_QUARTER = 'First Quarter',
  SECOND_QUARTER = 'Second Quarter',
  THIRD_QUARTER = 'Third Quarter',
  FOURTH_QUARTER = 'Fourth Quarter',
  THIS_YEAR = 'This Year',
  LAST_YEAR = 'Last Year',
}

export class MaterialsSuppliedDto{
  id: string
  name: string
  unit: string
  quantity: number
}

export enum PaymentMethodsEnum{
  BANK_PAYMENT= 'Bank Payment',
  CASH = 'Cash',
  CHEQUE = 'Cheque'
}

export enum QuoteStatusEnum{
  PENDING = 'Pending',
  EXPIRED = 'Expired',
  CONVERTED = 'Converted'
}

export enum InvoiceStatusEnum{
  UNPAID = 'Unpaid',
  PARTIAL = 'Partial',
  PAID = 'Paid',
  OVERPAID = 'Overpaid'
}

export class RecordInvoicePaymentDto{
  @IsNotEmpty()
  paymentDate: Date

  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  paymentMethod: PaymentMethodsEnum

  @IsNotEmpty()
  paymentAccountId: string

  @IsNotEmpty()
  notes: string

  @IsNotEmpty()
  invoiceId: string
}

export interface InvoiceLineItemDto {
  _id?: string
  id: number | string;
  itemId: string
  name: string
  categoryId: string
  unit: string
  price: number
  purchasePrice: number
  installationRate: number
  quantity: number
  amount:number
  taxable: boolean
  sourceId?: string
  invoiceDate?: Date
  _invoice?: InvoiceDto
}

export interface QuoteLineItemDto {
  _id?: string
  id: number | string;
  itemId: string
  name: string
  categoryId: string
  unit: string
  price: number
  installationRate: number
  purchasePrice: number
  quantity: number
  amount:number
  taxable: boolean
  sourceId?: string

}
export class QuoteDto{
  @IsNotEmpty()
  _id: string

  _customer?: CustomersDto

  _project?: ProjectDto

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  memo: string

  @IsNotEmpty()
  estimateNumber: number

  @IsNotEmpty()
  estimateDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemsTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: QuoteLineItemDto[]

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalTaxable:number


  @IsNotEmpty()
  status: QuoteStatusEnum
  converted?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean
}

export class InvoiceDto{
  @IsNotEmpty()
  _id: string

  _customer?: CustomersDto

  _project?: ProjectDto

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  memo: string

  @IsNotEmpty()
  invoiceNumber: number

  @IsNotEmpty()
  invoiceDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemsTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: QuoteLineItemDto[]

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalTaxable:number


  @IsNotEmpty()
  status: InvoiceStatusEnum

  _quote?: QuoteDto

  overdueDate: Date
  isOverdue: boolean
  outstandingBalance: number

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean

}

export class UpdateQuoteDot{
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsOptional()
  email: string

  @IsNotEmpty()
  memo: string

  @IsOptional()
  address: string

  @IsNotEmpty()
  estimateNumber: number

  @IsNotEmpty()
  estimateDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: QuoteLineItemDto[]

  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  totalTaxable:number

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean
}
export class CreateQuoteDot{
  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsOptional()
  email: string

  @IsNotEmpty()
  memo: string

  @IsOptional()
  address: string

  @IsNotEmpty()
  estimateNumber: number

  @IsNotEmpty()
  estimateDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: QuoteLineItemDto[]

  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  totalTaxable:number

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean
}

export class UpdateInvoiceDto{
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsOptional()
  email: string

  @IsNotEmpty()
  memo: string

  @IsOptional()
  address: string

  @IsNotEmpty()
  estimateNumber: number

  @IsNotEmpty()
  estimateDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: QuoteLineItemDto[]

  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  totalTaxable:number

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean
}
export class CreateInvoiceDto{
  @IsNotEmpty()
  customerId: string

  @IsOptional()
  projectId: string

  @IsOptional()
  email: string

  @IsNotEmpty()
  memo: string

  @IsOptional()
  address: string

  @IsNotEmpty()
  invoiceNumber: number

  @IsNotEmpty()
  invoiceDate: Date

  @IsNotEmpty()
  validity: string

  @IsNotEmpty()
  itemTaxId: string

  @IsNotEmpty()
  getFundTaxId: string

  @IsNotEmpty()
  nhilTaxId: string

  @IsNotEmpty()
  vat12TaxId: string

  @IsNotEmpty()
  paymentTermDescription: string

  @IsNotEmpty()
  deliveryTerm: string

  @IsNotEmpty()
  taxType: TaxTypeEnum

  @IsNotEmpty()
  discountType: DiscountTypeEnum

  @IsNotEmpty({each: true})
  lineItems: InvoiceLineItemDto[]

  @IsNotEmpty()
  equipmentAndMaterialSubTotal?: number

  @IsNotEmpty()
  equipmentsSalesTaxAmount?: number

  @IsNotEmpty()
  totalEquipmentAndMaterials?: number

  @IsNotEmpty()
  installationSubTotal?: number

  @IsNotEmpty()
  installationGetFundTax?: number

  @IsNotEmpty()
  installationNhilTax?: number

  @IsNotEmpty()
  vat12TaxOnTotalTaxable?: number

  @IsNotEmpty()
  totalInstallation?: number

  @IsNotEmpty()
  totalAmount: number
  @IsNotEmpty()
  totalTaxable:number

  @IsOptional()
  referenceQuoteId?: string

  @IsNotEmpty()
  @IsBoolean()
  includeInstallation: boolean
}
export class DocNumberDto{
  _id?: string
  purchaseOrder: number
  quote: number
  invoice: number
}

export enum SalesDocValidityEnum{
  ONE_MONTH = '1 month',
  TWO_MONTH = '2 months',
  THREE_MONTH = '3 months',
  FOUR_MONTH = '4 months'
}
export enum DefaultAppSettings {
  DEFAULT_ITEMS_SALES_TAX = 'DEFAULT_ITEMS_SALES_TAX',
  DEFAULT_GET_FUND_TAX = 'DEFAULT_GET_FUND_TAX',
  DEFAULT_SALES_REVENUE = 'DEFAULT_SALES_REVENUE',
  DEFAULT_SERVICES_REVENUE = 'DEFAULT_SERVICES_REVENUE',
  DEFAULT_NHIL_TAX = 'DEFAULT_NHIL_TAX',
  DEFAULT_VAT12_TAX = 'DEFAULT_VAT12_TAX',
  NUMBERING_SYSTEM_ID = '6065a2fd5cda998468fd5009',
  INVENTORY_ACCOUNT_ID ='6022afb36503e8583515e201',
  SALES_REVENUE_ACCOUNT_ID = '6022afb36503e8583515e100',
  PURCHASES_ACCOUNT_ID = '6022afb36503e8583516f801',
  SERVICES_REVENUE_ACCOUNT_ID = '6022afb36503e8583515e101',
  CASH_IN_HAND_ACCOUNT_TYPE_ID = '6060774a54d73a4e3e6189f3',
  BANK_ACCOUNTS_ACCOUNT_TYPE_ID = '606077521139858c0405fcc8',
  RECEIVABLES_ACCOUNT_TYPE_ID = '6060771d3150a9dc5a12aa03',
  DEFAULT_FISCAL_YEAR_ID = '607c4b7e7bd1a68d768a3b7d',
  APP_SETTINGS_ID = '607c4b7e7bd1a68d768a3b78',
  CURRENT_ASSETS_ACCOUNT_GROUP_ID = '6022afb36503e8583514f892',
  DEVELOPER_ADMIN_ID = '6022afb36503e8583514f567',
  SYSTEM_ADMIN_ID = '6022afb36503e8583514f588',
  PAYMENT_TERM_ID = '',
  BASE_CURRENCY_ID = '',
  DEFAULT_OPENING_BALANCE_ADJUSTMENTS_ACCOUNT_ID = '',
  DEFAULT_RETAINED_EARNINGS_ACCOUNT_ID='',
}


export enum FixedAssetPurchaseStatusEnum{
  NEW = 'New',
  USED = 'Used'
}

export class FixedAssetDto{
  _id?: string
  name: string
  assetAccountId: string
  purchaseStatus: string|FixedAssetPurchaseStatusEnum
  purchaseDescription: string
  purchaseDate: string|Date
  purchasePrice: number
  vendorId: string
  isSold: boolean
  salesDescription: string
  salesDate: string|Date
  salesPrice: number
  salesExpense: number
  assetDescription: string
  location: string
  purchaseOrderNumber: string
  serialNumber: string
  warrantyExpires: string|Date
  notes: string
  _assetAccount?: LedgerInListDto
}

export class AddFixedAssetDto{
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsMongoId()
  assetAccountId: string

  @IsNotEmpty()
  @IsEnum(FixedAssetPurchaseStatusEnum)
  purchaseStatus: string|FixedAssetPurchaseStatusEnum

  @IsOptional()
  purchaseDescription: string

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: string|Date

  @IsNotEmpty()
  @IsNumber({maxDecimalPlaces:2})
  purchasePrice: number

  @IsNotEmpty()
  @IsMongoId()
  vendorId: string

  @IsNotEmpty()
  @IsBoolean()
  isSold: boolean

  @IsOptional()
  salesDescription: string

  @IsOptional()
  @IsDateString()
  salesDate: string|Date

  @IsOptional()
  @IsNumber({maxDecimalPlaces:2})
  salesPrice: number

  @IsOptional()
  @IsNumber({maxDecimalPlaces:2})
  salesExpense: number

  @IsOptional()
  assetDescription: string

  @IsOptional()
  location: string

  @IsOptional()
  purchaseOrderNumber: string

  @IsOptional()
  serialNumber: string

  @IsOptional()
  @IsDateString()
  warrantyExpires: string|Date

  @IsOptional()
  notes: string
}

export enum StockMovementTypeEnum{
  SALES= 'Sales',
  GRN = 'Goods Received'
}

export class StockMovementDto{
  _id?: string
  documentId: string
  date: Date
  productId: string
  quantity: number
  unitPrice: number
  description: string
  type: StockMovementTypeEnum
  projectId?: string
  customerId?: string
  invoiceId?: string
  grnId?: string
  _customer?: CustomersDto
  _project?: ProjectDto
  _invoice?: InvoiceDto
  _product?: ItemInListDto
}

export class StockBalanceDto {
  _id?: string
  productId: string
  date: Date
  quantity: number
  unitPrice: number
  documentId: string
  updatedAt: Date
  _product: ItemInListDto
}



export const  CreditTermsList = [
  {
    display: 'NET 30',
    days: 30
  },
  {
    display: 'NET 60',
    days: 60
  },
  {
    display: 'NET 90',
    days: 90
  }
]
export enum FiscalPositionEnum{
  NORMAL_TAXES = 'Normal Taxes',
  TAX_EXEMPT = 'Tax Except',
}
export class CustomersDto{
  _id?: string
  active: boolean
  name: string
  isCompany: boolean
  companyName: string
  email: string
  phone:string
  address: string
  city: string
  country: string
  creditTerm: number
  creditLimit: number
  fiscalPosition: FiscalPositionEnum
  salesPersonId: string
  accountsReceivableId: string
  _currency: CurrencyDto
  _account: LedgerInListDto
  _salesPerson: MembersInListDto
  _notes: NoteDto[]
}

export class AddCustomerNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @IsNotEmpty()
  note: string;
}

export class EditCustomerNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @IsNotEmpty()
  note: string;

  @IsMongoId()
  @IsNotEmpty()
  noteId: string;
}


export class ChangeCustomerOwnerDto {
  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  salesPersonId: string;
}
export class EditCustomerDto{

  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  name: string

  @IsOptional()
  companyName: string

  @IsOptional()
  email: string

  @IsOptional()
  phone: string

  @IsOptional()
  address: string

  @IsOptional()
  city: string

  @IsOptional()
  country: string

  @IsNotEmpty()
  @IsBoolean()
  isCompany: boolean


  @IsOptional()
  salesPersonId: string




  @IsNotEmpty()
  @IsBoolean()
  taxable:boolean

  @IsNotEmpty()
  paymentTerm: number

  @IsOptional()
  creditLimit: number
}

export class AddCustomerDto{
  @IsNotEmpty()
  name: string

  @IsOptional()
  companyName: string

  @IsOptional()
  email: string

  @IsOptional()
  phone: string

  @IsOptional()
  address: string

  @IsOptional()
  city: string

  @IsOptional()
  country: string

  @IsNotEmpty()
  @IsBoolean()
  isCompany: boolean


  @IsOptional()
  salesPersonId: string

  @IsNotEmpty()
  @IsBoolean()
  taxable:boolean

  @IsNotEmpty()
  paymentTerm: number

  @IsOptional()
  creditLimit: number
}

export enum TransactionType {
  Debit = 'D',
  Credit = 'C',
}

export class JournalTransactionLineItemDto{
  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType|string

  @IsNotEmpty()
  accountId: string

  @IsNotEmpty()
  @IsNumber()
  amount: number
}
export class AddJournalEntryDto{
  @IsNotEmpty()
  transactionDate: Date

  @IsNotEmpty()
  description: string

  @IsArray()
  @IsNotEmpty()
  transactions: JournalTransactionLineItemDto[]
}

export class TrialBalanceReportLineItem{
  accountId: string
  accountName: string
  accountTypeId: string
  accountTypeName: string
  accountGroupId: string
  accountGroupName: string
  kind: AccountKindEnum|string
  debits: number
  credits: number
}

export class TransactionsDto{
  _id: string
  documentId?: string
  projectId?: string
  accountId: string
  invoiceNumber?: number
  checkNumber?: string
  amount: number
  description: string
  transactionDate: Date
  period: number
  year: number
  paymentNote?: string
  JournalType: JournalTypesEnum| string
  transactionKey: String
  transactionType?: TransactionType | string
  posted?: boolean
  postDate?: Date
  accountName?: string
  accountKind?: AccountKindEnum|string
  isPayment?: boolean
}

export class BeginningBalanceItemDto {
  @IsNotEmpty()
  @IsMongoId()
  accountId: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  transactionType: TransactionType
}

export class SetBeginningBalancesDto{

  @IsNotEmpty()
  @IsArray()
  assets: BeginningBalanceItemDto[]

  @IsNotEmpty()
  @IsArray()
  liabilities: BeginningBalanceItemDto[]

  @IsNotEmpty()
  @IsArray()
  equity: BeginningBalanceItemDto[]
}

export enum PaymentStatusEnum {
  UNPAID,
  PARTIAL,
  PAID,
}

export class ProductAccountSetInListDto {
  _id: string;
  name: string;
  costingMethod: CostingMethodsEnum;
  stockAccountId: string;
  payableAccountId: string;
  shipmentAccountId: string;
  _stockAccount?: LedgerInListDto;
  _payableAccount?: LedgerInListDto;
  _shipmentAccount?: LedgerInListDto;
}

export class AddProductAccountSetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(CostingMethodsEnum)
  costingMethod: CostingMethodsEnum;

  @IsNotEmpty()
  @IsMongoId()
  stockAccountId: string;

  @IsNotEmpty()
  @IsMongoId()
  payableAccountId: string;

  // @IsNotEmpty()
  // @IsMongoId()
  @IsOptional()
  shipmentAccountId: string;
}

export enum ItemCategoryEnum {
  EQUIPMENTS = 'Equipments',
  PIPES_AND_ACCESSORIES = 'Pipes & Accessories',
  ELECTRICALS = 'Electrical',
  DRAINAGES = 'Drainage',
  DUCTS = 'Ducts',
  MISCELLANEOUS = 'Miscellaneous',
  SERVICES = 'Services',
}
export enum ItemType {
  GOODS = 'Goods',
  Service = 'Service',
}

export enum StockChangesEnum {
  RECOUNT = 'Recount',
  SOLD = 'Sold',
  RESTOCK = 'Re-stock',
}

export enum CurrencyEnum {
  GHC = 'GHC',
  USD = 'USD',
}

export enum AccountKindEnum {
  Asset = 'Assets',
  Liability = 'Liability',
  Equity = 'Owners Equity',
  Revenue = 'Revenue',
  Expense = 'Expense',
}

export enum JournalTypesEnum {
  GeneralJournal = 'GJ',
  AccountReceivable = 'AR',
  AccountPayable = 'AP',
  SalesJournal = 'SJ',
  PurchaseJournal = 'PJ',
}



export class AddAccountGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccountKindEnum, { message: 'Incorrect account type' })
  type: string;
}

export class AddAccountLedgerDto {
  @IsNotEmpty()
  @IsMongoId()
  accountTypeId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  number: string | number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  currency: CurrencyEnum|string
}

export class UpdateAccountLedgerDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  number: string | number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;
}

export class AccountGroupDto {
  _id?: string;
  name: string;
  type: AccountKindEnum | string;
  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
}

export class AccountTypeDto {
  _id?: string;
  name: string;
  accountGroupId: string
  _accountGroup?: AccountGroupDto
  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
}



export class LedgerInListDto {
  _id?: string;
  balance: number;
  currency?: CurrencyEnum|string;
  archived: boolean;
  accountTypeId: string;
  name: string;
  accountGroupId: string;
  accountKind: AccountKindEnum|string
  description?: string;
  number: string | number;
  accountGroupName: string
  accountTypeName: string
  lastPostedTransaction?: TransactionsDto
  _accountGroup?: AccountGroupDto
  _accountType?: AccountTypeDto
}

export class BrandInListDto {
  _id: string;
  name: string;
  isActive: boolean;
}

export class WarehouseInListDto {
  _id: string;
  name: string;
  isActive: boolean;
}

export class ItemCategoryDto {
  _id: string;
  name: string;
  isActive: true;
  type: ItemTypeEnum
  salesAccountId: string;
  purchaseAccountId;
  _salesAccount: LedgerInListDto;
  _purchaseAccount: LedgerInListDto;
}

export class AddProductCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: ItemTypeEnum|string

  @IsOptional()
  @IsMongoId()
  salesAccountId: string;

  @IsOptional()
  @IsMongoId()
  purchaseAccountId: string;
}

export class RenameItemCategoryDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}

export class PurchaseTaxInListDto {
  _id?: string;
  name: string;
  recoverable: boolean;
  collectionAccountId:string
  rate: number;
  _collectionAccount?: LedgerInListDto
}

export class SalesTaxInListDto {
  _id?: string;
  name: string;
  collectionAccountId:string
  rate: number;
  tag: string|DefaultAppSettings
  _collectionAccount?: LedgerInListDto
}

export class CreatePurchaseTaxDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  collectionAccountId: string

  @IsNotEmpty()
  recoverable: boolean;
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  rate: number;
}

export class CreateSalesTaxDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  collectionAccountId: string

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  rate: number;
}

export class PaymentTermDto {
  _id?: string;
  name: string;
  default: boolean;
  description: string;
  isActive: boolean;
}

export class AddPaymentTermDto {
  name: string;
  description: string;
}

export class ItemTaxDto {
  _id?: string;
  itemId: string;
  salesTaxId: string;
  taxAbbreviation: string;
  rate: number;
  recoverable: boolean;
}

export class ItemInListDto {
  _id?: string;
  type: string
  photoUrl?: string;
  name: string;
  categoryId?: string;
  unit?: string;
  sku?: string
  sell: boolean
  sellingPrice: number;
  salesAccountId: string;
  buy: boolean
  purchasesAccountId: string;
  purchasePrice: number;
  warehouseId: string;
  inventoryAccountId: string;
  reorderPoint: number
  trackInventory: boolean
  salesTaxable: boolean
  _category?: ItemCategoryDto;
  _warehouse?: WarehouseInListDto;
  _purchaseAccount?: LedgerInListDto;
  _salesAccount?: LedgerInListDto;
  _taxes?: ItemTaxDto[];
  _stockBalance?: StockBalanceDto
}

export class EditProductDto {

  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  unit: string;


  @IsNotEmpty()
  @IsMongoId()
  salesAccountId: string

  @IsNotEmpty()
  @IsNumber()
  sellingPrice: number;

  @IsNotEmpty()
  @IsNumber()
  purchasePrice: number;

  @IsNotEmpty()
  @IsMongoId()
  purchasesAccountId: string


  @IsNotEmpty()
  warehouseId: string;

  @IsNotEmpty()
  inventoryAccountId: string;


  @IsNotEmpty()
  @IsNumber()
  reorderPoint: number;

}

export class AddProductDto {

  @IsNotEmpty()
  @IsEnum(ItemTypeEnum)
  type: string

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  unit: string;

  @IsOptional()
  sku: string

  @IsNotEmpty()
  @IsBoolean()
  taxable: boolean;

  @IsNotEmpty()
  @IsBoolean()
  sell: boolean

  @IsOptional()
  @IsMongoId()
  salesAccountId: string

  @IsOptional()
  salesDescription: string

  @IsOptional()
  @IsNumber()
  sellingPrice: number;


  @IsNotEmpty()
  @IsBoolean()
  buy: boolean

  @IsOptional()
  @IsNumber()
  purchasePrice: number;

  @IsOptional()
  @IsMongoId()
  purchasesAccountId: string

  @IsOptional()
  purchaseDescription: string

  @IsOptional()
  @IsMongoId()
  preferredSupplierId: string


  @IsOptional()
  @IsMongoId()
  warehouseId: string;

  @IsOptional()
  @IsMongoId()
  inventoryAccountId: string;

  @IsOptional()
  @IsNumber()
  initialQuantity: number;

  @IsOptional()
  @IsNumber()
  reorderPoint: number;

  @IsOptional()
  @IsDateString()
  stockBalanceDate: string|Date;

  @IsNotEmpty()
  @IsBoolean()
  trackInventory: boolean

  @IsNotEmpty()
  @IsBoolean()
  salesTaxable: boolean

}

export class UnitsInListDto {
  @IsNotEmpty()
  _id?: string;

  @IsNotEmpty()
  name: string;
}

export class AddUnitDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateCurrencyDto {
  @IsNotEmpty()
  _id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  symbol: string;
}

export class ExchangeRateInListDto {
  _id?: string;
  currencyId: string;
  effectiveDate: Date;
  rate: number;
  active?: boolean;
}

export class CurrencyDto {
  @IsNotEmpty()
  _id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  isBaseCurrency?: boolean;

  @IsNotEmpty()
  isActive?: boolean;

  @IsNotEmpty()
  isSystemManaged?: boolean;

  _exchangeRates?: ExchangeRateInListDto[];
}

export class AddCurrencyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  rate: number;

  @IsNotEmpty()
  @IsDateString()
  effectiveDate: Date;
}

export class CreateExchangeRateDto {
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  rate: number;

  @IsNotEmpty()
  @IsDateString()
  effectiveDate: Date;
}

export class UpdateExchangeRateDto {
  @IsNotEmpty()
  @IsMongoId()
  currencyId: string;

  @IsNotEmpty()
  @IsMongoId()
  exchangeRateId: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  rate: number;

  @IsNotEmpty()
  @IsDateString()
  effectiveDate: Date;
}

export class AddSupplierDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  currencyId: string;

  @IsNotEmpty()
  creditTerm: number;

  @IsNotEmpty()
  accountPayableId: string;

}

export class SupplierContactDto {
  _id?: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supplierId: string;

  //TODO: Add banks information
  // bankInformation: {
  //   name: string
  //   address: string
  //   accountNumber: string
  //   swiftCode: string
  // }
}

export class SupplierDto {
  _id?: string;
  companyName: string;
  city: string;
  country: string;
  currencyId: string;
  openingBalance: number;
  creditTerm: number
  accountPayableId: string
  _currency: CurrencyDto;
  _contacts: SupplierContactDto[];
  _primaryContact: SupplierContactDto;
  _account: LedgerInListDto
}

export interface TempPurchaseOrderLineItemDto {
  id: string;
  itemRefId?: string;
  name: string;
  purchaseAccountId: string;
  _purchaseAccountName?: string;
  rate: number;
  quantity: number;
  purchasesTaxes: number[];
  total: number;
  _taxes?: ItemTaxDto[];
}
