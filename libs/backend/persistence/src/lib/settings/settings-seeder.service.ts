import { Injectable, Logger } from '@nestjs/common';
import { ISettings, SettingsDocument } from './settings.schema';
import { SettingsRepository } from './settings.repository';
import { environment, FeLogger } from "@fom/backend/common";
import { DefaultAppSettings, MonthNamesEnum } from '@fom/shared/api-dtos';

@Injectable()
export class SettingsSeederService {
  SETTINGS: ISettings[] = [
    {
      _id: DefaultAppSettings.APP_SETTINGS_ID,
      currentDate: new Date(),
      currentPeriod: new Date().getMonth() + 1,
      firstMonthOfFiscalYearIndex: 0,
      firstMonthOfFiscalYearName: MonthNamesEnum.JANUARY,
      beginningBalanceDate: new Date(2021, 0, 1),
      closeBooks: false,
      defaultInventoryAccountId: DefaultAppSettings.INVENTORY_ACCOUNT_ID,
      defaultPurchasesAccountId: DefaultAppSettings.PURCHASES_ACCOUNT_ID,
      defaultSalesAccountId: DefaultAppSettings.SALES_REVENUE_ACCOUNT_ID,
      defaultPaymentTermId: DefaultAppSettings.PAYMENT_TERM_ID,
      baseCurrencyId: DefaultAppSettings.BASE_CURRENCY_ID,
      defaultOpeningBalanceAdjustmentAccountId:
        DefaultAppSettings.DEFAULT_OPENING_BALANCE_ADJUSTMENTS_ACCOUNT_ID,
      paymentReceiptNumber: 1,
      businessRegistrationId: '',
      companyName: environment.company.name,
      companyAddress: environment.company.address,
      companyEmail: 'info@maybertgh.com',
      logoUrl: environment.company.logo,
      phoneNumbers:'',
      website: environment.company.website,
      expenseNumber: 1000,
      currentYear: 2021,
      defaultServiceAndInstallationAccountId: DefaultAppSettings.SERVICES_REVENUE_ACCOUNT_ID,
      accountantMasterPassword: 'password123!',
      defaultRetainedEarningsAccountId: DefaultAppSettings.DEFAULT_RETAINED_EARNINGS_ACCOUNT_ID,
      billPaymentReceiptNumber: 1000,
      weekDayOvertimeRate: 1.5,
      weekEndOvertimeRate: 2
    },
  ];

  seedCount = 0;
  constructor(
    private readonly repository: SettingsRepository,
    private console: FeLogger
  ) {}

  private async seed(): Promise<Array<Promise<SettingsDocument>>> {
    return this.SETTINGS.map(async (settings: ISettings) => {
      return await this.repository
        .getById(settings._id)
        .then(async (exist) => {
          if (exist) {
            return Promise.resolve(null);
          }


          return Promise.resolve(this.repository.create(settings));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  async migrate() {
    let totalSeed = 0;

    return await this.seed()
      .then(async (createdLanguages) => {
        await Promise.all(createdLanguages).then((language) => {
          const seeded = language.filter((l) => l !== null);
          totalSeed = seeded.length;
        });

        if (totalSeed) {
          this.console.log(`Seeded ${totalSeed} application settings ...`);
        }

        return Promise.resolve(totalSeed);
      })
      .catch((error) => {
        Logger.log('An error occurred while seeding application settings');
        return Promise.reject(error);
      });
  }
}
