import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import { FilesService,  UnitsQuery, UnitsService } from '@fom/web/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FoodItemsInListDto, ItemInListDto } from '@fom/shared/api-dtos';
import { FoodItemsQuery, FoodItemsService } from '@fom/web/core';

@Component({
  selector: 'fom-food-items',
  templateUrl: './food-items-list.component.html',
  styleUrls: ['./food-items-list.component.scss']
})
export class FoodItemsListComponent implements OnInit {
  showModal = false;
  showEditModal = false;

  filteredFoodItems: FoodItemsInListDto[] = [];
  allFoodItems: FoodItemsInListDto[] = [];
  foodItems$ = this.foodItemsQuery.selectAll().pipe(
    tap((data:FoodItemsInListDto[]) => {
      const sorted = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
      this.filteredFoodItems = this.allFoodItems = sorted
    })
  );
  searchTerm = '';
  selectedMember: ItemInListDto = null;

  tableColumns: any[];
  exportedColumns: any[];

  form = this.fb.group({
    name: [null, [Validators.required]],
    unit: [null, [Validators.required]]
  })

  units$ = this.unitsQuery.selectAll()

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private foodItemsQuery: FoodItemsQuery,
              private modal: NzModalService,
              private filesSrv: FilesService,
              private unitsService: UnitsService,
              private unitsQuery: UnitsQuery,
              private notification: NzNotificationService,
              private foodItemsService: FoodItemsService) {
  }

  ngOnInit(): void {
    this.unitsService.get().subscribe()
    this.foodItemsService.getAllFoodItems().subscribe()
    this.foodItemsService.getAlFoodItemsRT()
  }


  filterData(data: string) {
    // this.searchTerm = data;
    // if (data) {
    //   this.filteredCardHolders = this.allCardHolders.filter((res: ItemInListDto) => {
    //     return (
    //       res.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
    //       res.card_num.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
    //       res.phone.toLowerCase().indexOf(data.toLowerCase()) > -1
    //     );
    //   });
    // } else {
    //   this.filteredCardHolders = this.allCardHolders;
    // }
  }

  addFoodItem() {

  }
}
