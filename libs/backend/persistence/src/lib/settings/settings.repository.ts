import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISettings, SETTINGS_MODEL_NAME, SettingsDocument } from './settings.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectModel(SETTINGS_MODEL_NAME)
    private model: Model<SettingsDocument>
  ) {}

  async create(payload: ISettings) {
    return new this.model({ ...payload }).save();
  }

  async update(id: string, payload: Partial<ISettings>) {
    return this.model.findByIdAndUpdate({ _id: id }, payload, { new: true });
  }

  async getById(id: string) {
    return this.model
      .findById(id)
      .populate('_defaultSalesAccount')
      .populate('_defaultPurchasesAccount')
      .populate('_defaultInventoryAccount')
      .populate('_defaultOpeningBalanceAdjustmentAccount')
      .populate('_defaultPaymentTerm')
      .populate('_baseCurrency')
      .populate('_currentFiscalYear')
      .lean();
  }

  async getAll(): Promise<ISettings> {
    return this.model
      .find()
      .populate('_defaultSalesAccount')
      .populate('_defaultPurchasesAccount')
      .populate('_defaultInventoryAccount')
      .populate('_defaultOpeningBalanceAdjustmentAccount')
      .populate('_defaultPaymentTerm')
      .populate('_baseCurrency')
      .populate('_currentFiscalYear')
      .lean();
  }
}
