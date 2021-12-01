export interface IEnvironment{
  host: string
  production: boolean
  mongodbUrl: string
  readsMongodbUrl: string
  authentication: {
    secret: string
    jwtOptions: {
      header: {
        type: 'access'
      },
      audience: 'https://maybert.org'
      issuer: 'Maybert Enterprise BackOffice'
      algorithm: 'HS256',
      expiresIn: '1d'|'1hr'
    },
  },
  ses: {
    host: string
    port: number
    secure: boolean,
    smtpUserName: string,
    smtpPassword: string
  },
  mail: {
    from: string
  },
  company: {
    logo: string
    name: string
    address: string
    location: string
    website: string
  },
  authTokensExpirationDays: number,
  officialEmail: {
    allowedAnyTld: boolean,
    allowedEmailSuffixes: string[],
  },
  clientApps: {
    admin: string
    school: string
    suppliers: string
  },
  redis: {
    host: 'localhost',
    port: number,
  },
  vapidKeys: {
    publicKey:
      'BPmQvr03CL_VJH6hwiDHRxq6Cjgiem5mtEg2ABW22UW8K0N7GdhiOdocEpXmixdM67PdquaMRqssGKRt1paxtj8',
    privateKey: 'luxCq47RtOQogtKFGYK4E_Mtf2ZPaX7_HcPIjIHDZeo',
    subject: 'mailto:danquahwhite@gmail.com',
  },
  defaultCurrency: 'GHC'| 'USD',
  inventoryStartDate: Date
  sendGrid: {
    apiKey: string
  },
  twilio: {
    accountSid: string,
    authToken: string,
    messagingServiceSid: string
  }
}
