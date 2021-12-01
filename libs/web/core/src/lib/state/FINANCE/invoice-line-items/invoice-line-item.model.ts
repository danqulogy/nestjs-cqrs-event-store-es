import {v4} from 'uuid'
import { InvoiceLineItemDto } from "@fom/shared/api-dtos";


export function createInvoiceLineItem(params: Partial<InvoiceLineItemDto>) {
  return {
    ...params,
    id: v4(),
    quantity: 1,
  } as InvoiceLineItemDto;
}
