import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AppEventsEnum,
  getAllPurchases,
  ProductPurchasedEvent,
  ProductRefundedEvent,
} from './views';
import { v4 } from 'uuid';
import { jsonEvent, JSONEventType } from '@eventstore/db-client';
import { eventStoreClient } from '@fom/backend/application';
import { IsNotEmpty } from 'class-validator';
import { PurchaseFacade } from './purchase.facade';
import { PurchaseItemDto } from './purchase-item.dto';
import { CommandBus } from '@nestjs/cqrs';
import { PurchaseItemCommand } from './purchase-item.command';

export class CreatePurchaseRequest {
  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  name: string;
}

export class RefundPurchaseRequest {
  @IsNotEmpty()
  purchaseId: string;
}


@Controller('purchases')
export class PurchasesController {

  constructor(private facade: PurchaseFacade, private commandBus: CommandBus) {}

  @Get()
  async getPurchases() {
    return await getAllPurchases();
  }

  @Post()
  async create(@Body() req: CreatePurchaseRequest) {

    const purchaseId = v4();

    const payload:PurchaseItemDto = {
      purchaseId: purchaseId,
      amount: Number.parseFloat(req.amount),
      name: req.name,
    }


    return this.commandBus.execute(new PurchaseItemCommand(payload))

    // const purchasedEvent = jsonEvent<ProductPurchasedEvent>({
    //   type: AppEvents.ProductPurchased,
    //   data: {
    //     purchaseId: purchaseId,
    //     amount: Number.parseFloat(req.amount),
    //     name: req.name,
    //   },
    // });

    // await eventStoreClient.appendToStream(purchaseId, [purchasedEvent]);
    // return { message: 'Your request is been processed' };
  }

  @Post('/refund')
  async refund(@Body() req: RefundPurchaseRequest) {
    const refundEvent = jsonEvent<ProductRefundedEvent>({
      type: AppEventsEnum.ProductRefunded,
      data: {
        purchaseId: req.purchaseId,
      },
    });

    await eventStoreClient.appendToStream(req.purchaseId, [refundEvent]);
  }
}
