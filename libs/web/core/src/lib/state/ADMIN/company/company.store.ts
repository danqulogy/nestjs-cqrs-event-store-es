import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita'
import { Company, createCompany } from './company.model'

export interface CompanyState extends Company{

}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'company'})
export class CompanyStore extends Store<CompanyState> {
  constructor() {
    super(createCompany({
      _id: null,
      name: null,
      email: null,
      address: null,
      city: null,
      region: null,
      country: null,
      phoneNumber: null,
      websiteUrl: null
    }));
  }

}
