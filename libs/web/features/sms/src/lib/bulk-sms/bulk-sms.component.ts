import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterUserDto, SendSmsDto, SmsInListDto, UserInListDto } from '@fom/shared/api-dtos';
import { map, tap } from 'rxjs';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import {
  MembersQuery,
  MembersService,
  RolesQuery,
  RolesService,
  SmsQuery,
  SmsService,
  UsersQuery,
  UsersService
} from '@fom/web/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'fom-bulk-sms',
  templateUrl: './bulk-sms.component.html',
  styleUrls: ['./bulk-sms.component.scss']
})
export class BulkSmsComponent implements OnInit {

  showModal = false;
  showEditModal = false;

  form = this.fb.group({
    toAllMembers: [true, [Validators.required]],
    message: [null, [Validators.required]],
  })

  editForm = this.fb.group({
    username: [null, [Validators.required]],
    email: [null, [Validators.required]],
    roleId: [null, [Validators.required]],
  })

  name =  this.form.get('name');
  email = this.form.get('email');
  roleId = this.form.get('roleId');

  filteredUsers: SmsInListDto[] = [];
  allUsers: SmsInListDto[] = [];
  users$ = this.smsQuery.selectAll().pipe(
    tap(data => console.log(data)),
    tap((data) => (this.filteredUsers = this.allUsers = data))
  );
  searchTerm = '';
  selectedUser: SmsInListDto = null;

  members$ = this.membersQuery.selectAll().pipe(
    map(data => data.length)
  );

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private smsQuery: SmsQuery,
              private modal: NzModalService,
              private notification: NzNotificationService,
              private rolesQuery: RolesQuery,
              private rolesService: RolesService,
              private membersService: MembersService,
              private membersQuery: MembersQuery,
              private smsService: SmsService) { }

  ngOnInit(): void {
    this.smsService.getAllMessages().subscribe()
    this.membersService.getAllMembers().subscribe();
  }

  onSubmit() {
    this.feMessageService.emitError([])

    this.notification.error('Ops! Something went wrong', 'Insufficient sms credits')

    // const payload: SendSmsDto = {
    //   name: this.name.value,
    //   email: this.email.value,
    //   roleId: this.roleId.value
    // }
    //
    // this.usersService.sendMessage(payload).subscribe(() => {
    //   this.usersService.clearCache();
    //   this.usersService.getAllMessages().subscribe()
    //   this.showModal = false
    //   this.form.reset()
    //   this.notification.success('Successful', `${payload.name} has been added as a user`)
    // }, err => {
    //   this.feMessageService.emitError(err.error?.errorMessage)
    // })
  }



  filterData(data: string) {
    this.searchTerm = data;
    if (data) {
      this.filteredUsers = this.allUsers.filter((res: SendSmsDto) => {
        return (
          res.message.toLowerCase().indexOf(data.toLowerCase()) > -1
        );
      });
    } else {
      this.filteredUsers = this.allUsers;
    }
  }

  populateForm(data: SmsInListDto) {
    this.selectedUser = data;
    this.editForm.patchValue(data, {emitEvent: true})
    console.log('edit form', this.editForm.value)
  }



}
