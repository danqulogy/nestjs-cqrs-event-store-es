export interface Company {
  _id: string
  name: string
  email: string
  address: string
  city: string
  region: string
  country: string
  phoneNumber: string
  websiteUrl: string
}

export function createCompany(params: Partial<Company>) {
  return {

  } as Company;
}
