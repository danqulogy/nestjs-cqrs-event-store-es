import { FoodItemAddedEvent } from '../events/food-item-added.event';
import { AggregateRootBase } from '../../../core/AggregateRootBase';
import { v4 } from 'uuid';
import { IEvent } from '@nestjs/cqrs';

export class FoodItem extends AggregateRootBase {
  id: string;
  name!: string;
  buyingPrice!: number;
  active = true;

  async addItem(name: string, buyingPrice: number) {
    this.id = v4();
    this.name = name;
    this.buyingPrice = buyingPrice;

    await this.applyEvent(
      new FoodItemAddedEvent(this.id, {
        id: this.id,
        name: this.name,
        marketPrice: this.buyingPrice,
        active: true,
      })
    );
  }

  loadFromHistory(history: IEvent[]) {
    super.loadFromHistory(history);
  }
}
