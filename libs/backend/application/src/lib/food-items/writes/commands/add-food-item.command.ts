import { FoodItemsRepository } from '@fom/backend/persistence';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FoodItem } from '../model/FoodItem';
import { AddFoodItemDto } from '../../food-items.controller';

export class AddFoodItemCommand {
  constructor(public readonly payload: AddFoodItemDto) {}
}

@CommandHandler(AddFoodItemCommand)
export class AddFoodItemCommandHandler
  implements ICommandHandler<AddFoodItemCommand>
{
  constructor(
    private repository: FoodItemsRepository,
    private publisher: EventPublisher
  ) {}
  async execute(command: AddFoodItemCommand): Promise<any> {
    const item = this.publisher.mergeObjectContext(new FoodItem());

    await item.addItem(command.payload.name, command.payload.buyPrice);

    await item.commit();

    // await this.repository.addItem({
    //   foodItemId: item.id,
    //   name: item.name,
    //   unit: 'Default Unit',
    //   active: item.active,
    // });
  }
}
