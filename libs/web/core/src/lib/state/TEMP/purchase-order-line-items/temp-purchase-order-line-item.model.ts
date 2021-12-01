import { TempPurchaseOrderLineItemDto } from "@fom/shared/api-dtos";
import { v4 } from "uuid";

export function createTempPurchaseOrderLineItem(params: Partial<TempPurchaseOrderLineItemDto>) {
  return {
    id: v4(),
    itemRefId: params.itemRefId || null,
    name: params.itemRefId|| null,
    purchaseAccountId: params.purchaseAccountId || null,
    purchasesTaxes: params.purchasesTaxes || [],
    quantity: params.quantity || 0,
    rate: params.rate || 0,
    total: params.total || 0
  } as TempPurchaseOrderLineItemDto;
}
