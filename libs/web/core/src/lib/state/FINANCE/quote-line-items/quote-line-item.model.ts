import {v4} from 'uuid'
import { QuoteLineItemDto } from "@fom/shared/api-dtos";


export function createQuoteLineItem(params: Partial<QuoteLineItemDto>) {
  return {
    ...params,
    id: v4(),
    quantity: 1,
  } as QuoteLineItemDto;
}
