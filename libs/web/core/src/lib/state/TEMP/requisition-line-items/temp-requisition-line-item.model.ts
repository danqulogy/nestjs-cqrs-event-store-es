import { TempRequisitionLineItem } from '@fom/shared/api-dtos';
import {v4} from 'uuid'

export function createTempRequisitionLineItem(params: Partial<TempRequisitionLineItem>) {
  return {
    ...params,
    id: v4()
  } as TempRequisitionLineItem;
}
