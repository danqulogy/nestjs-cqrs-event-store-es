import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  host: 'http://localhost:3333',
  production: false,
  mongodbUrl: 'mongodb+srv://admin:moe@moe.hckgx.mongodb.net/moe_dev?retryWrites=true&w=majority',
  readsMongodbUrl: 'mongodb+srv://admin:moe@moe.hckgx.mongodb.net/moe_dev_reads?retryWrites=true&w=majority',
  // mongodbUrl: 'mongodb://root:example@localhost:27017/moe_dev',
  authentication: {
    secret: '0BS6g1lUmIzskxGixUmbowTc0kefx7Of',
    jwtOptions: {
      header: {
        type: 'access',
      },
      audience: 'https://maybert.org',
      issuer: 'Maybert Enterprise BackOffice',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  },
  // ses: {
  //   host: 'email-smtp.eu-central-1.amazonaws.com',
  //   port: 587,
  //   secure: false,
  //   smtpUserName: 'AKIA6LAFVLGPYAI67EP7',
  //   smtpPassword: 'BP6LlaKBMbtkWc7Gqg83PhbwlbA1cQurr20I7ACpLNqt',
  // },
  ses: {
    host: 'smtp.sendgrid.net',
    port: 587, // unencrypted 25, 587 -> ssl 465
    secure: true,
    smtpUserName: 'apikey',
    smtpPassword: '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',
  },
  mail: {
    from: 'Maybert BackOffice <apps@maybert.org>',
  },
  company: {
    logo: 'https://apis.maybert.org/images/maybert-logo-large.png',
    name: 'Maybert Engineering Ltd',
    address: 'H/No. 107 Block 115, North-East Haatso',
    location: 'Accra, Ghana',
    website: 'http://maybertgh.com',
  },
  authTokensExpirationDays: 3,
  officialEmail: {
    allowedAnyTld: false,
    allowedEmailSuffixes: ['yahoo.com'],
  },
  clientApps: {
    admin: 'http://localhost:5000',
    school: 'http://localhost:5100',
    suppliers: 'http://localhost:5200',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  vapidKeys: {
    publicKey:
      'BPmQvr03CL_VJH6hwiDHRxq6Cjgiem5mtEg2ABW22UW8K0N7GdhiOdocEpXmixdM67PdquaMRqssGKRt1paxtj8',
    privateKey: 'luxCq47RtOQogtKFGYK4E_Mtf2ZPaX7_HcPIjIHDZeo',
    subject: 'mailto:danquahwhite@gmail.com',
  },
  defaultCurrency: 'GHC',
  inventoryStartDate: new Date(),
  sendGrid: {
    apiKey: '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'
  },
  twilio: {
    accountSid: "ACa99bed845c371913c32bf4e5a6ba6d0b",
    authToken: "41f14987f0ac996fa808b03af28a6dbd",
    messagingServiceSid: 'MG24d0229399c2d987e1a6a0a672f9e1d0'
  }
};
