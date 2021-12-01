import { UserInListDto } from '@fom/shared/api-dtos';

export interface SmsRecipientDto{
  _id?: string
  phoneNumber: string
  isSent: boolean
}

export class SendSmsDto{
  userId: string
  message: string
  recipients: SmsRecipientDto[]
}

export class SmsInListDto{
  userId: string
  message: string
  recipients: SmsRecipientDto[]
  successCount: number
  errorCount: number
  _user: UserInListDto
  created_at: Date;
}
