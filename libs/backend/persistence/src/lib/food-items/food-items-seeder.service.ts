import { Injectable, Logger } from '@nestjs/common'
import { FoodItemsRepository } from './food-items.repository';
import { FeLogger } from '@fom/backend/common';
import { FoodItemDocument, IFoodItem } from './food-items.schema';

@Injectable()
export class FoodItemsSeederService {

  DATA: IFoodItem[] = [
    // {
    //   name: 'Beans',
    //   unit: 'bags'
    // },
    // {
    //   name: 'Maize',
    //   unit: 'bags'
    // },
    // {
    //   name: 'Rice',
    //   unit: 'bags'
    // },
    // {
    //   name: 'Yam',
    //   unit: 'tubers'
    // },
  ]

  seedCount = 0
  constructor(private readonly foodItemsRepository: FoodItemsRepository,
              private console: FeLogger) {}

  private async seed(): Promise<Array<Promise<FoodItemDocument>>>{

    return this.DATA.map(async (foodItem) => {
      return await this.foodItemsRepository
        .findByName(foodItem.name)
        .then(async (item:IFoodItem) => {

          if (item){ return Promise.resolve(null) }
          return Promise.resolve(this.foodItemsRepository.seed(foodItem))
        })
        .catch(error => Promise.reject(error))
    })
  }

  async migrate(){
    let totalSeed = 0

    return await this.seed()
      .then(async created => {

        await Promise.all(created).then(roles => {
          const seeded = roles.filter(l => l !== null)
          totalSeed = seeded.length
        })

        if (totalSeed){
          this.console.log(`Seeded ${totalSeed} food items...`)
        }

        return Promise.resolve(totalSeed)
      })
      .catch(error => {
        Logger.log('An error occurred while seeding food food-items')
        return Promise.reject(error)
      })
  }

}
