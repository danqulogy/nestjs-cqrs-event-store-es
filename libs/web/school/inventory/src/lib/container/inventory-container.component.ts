import { Component, OnInit } from '@angular/core';
import { FormBuilder,  } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { tap } from 'rxjs';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import { FilesService, ItemsQuery, ItemsService } from '@fom/web/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ItemInListDto } from '@fom/shared/api-dtos';

@Component({
  selector: 'fom-card-holders',
  templateUrl: './inventory-container.component.html',
  styleUrls: ['./inventory-container.component.scss']
})
export class InventoryContainerComponent implements OnInit {


  showModal = false;
  showEditModal = false;

  filteredCardHolders: ItemInListDto[] = [];
  allCardHolders: ItemInListDto[] = [];
  cardHolders$ = this.cardHoldersQuery.selectAll().pipe(
    tap(data => console.log('card-holders: ',data)),
    tap((data:ItemInListDto[]) => {
      const sorted = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
      this.filteredCardHolders = this.allCardHolders = sorted
    })
  );
  searchTerm = '';
  selectedMember: ItemInListDto = null;

  tableColumns: any[];
  exportedColumns: any[];

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private cardHoldersQuery: ItemsQuery,
              private modal: NzModalService,
              private filesSrv: FilesService,
              private notification: NzNotificationService,
              private cardHoldersService: ItemsService) { }

  ngOnInit(): void {
    // this.cardHoldersService.get().subscribe()
  }


  exportPdf() {
    this.filesSrv.exportPdf(this.exportedColumns, this.filteredCardHolders, 'swuut-systems-card-holders.pdf');
  }

  exportExcel() {
    // const data = this.filteredCardHolders.map(e => {
    //   return {
    //     'Card Number': e.card_num,
    //     'Name': e.name,
    //     'Phone number': e.phone,
    //     'Balance': e.balance,
    //     'Registered': (new Date(e.createdAt)).toLocaleDateString()
    //   }
    // })
    // this.filesSrv.exportExcel(data, 'swuut-systems-card-holders');
  }

  private buildTableColumns() {
    this.tableColumns = [
      { field: 'firstName', header: 'Name' },
      { field: 'employeeId', header: 'Employee ID' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Mobile' },
      { field: 'dateJoined', header: 'Join Date' },
      { field: 'departmentName', header: 'Department' },
      { field: 'designationName', header: 'Designation' },
    ];
    this.exportedColumns = this.tableColumns.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
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



}
