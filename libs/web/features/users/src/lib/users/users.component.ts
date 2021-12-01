import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AddUserDto,
  MembersInListDto,
  RegisterMemberDto, RegisterUserDto,
  UpdateMemberInfoDto,
  UserInListDto
} from '@fom/shared/api-dtos';
import { tap } from 'rxjs';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import {  RolesQuery, RolesService, UsersQuery, UsersService } from '@fom/web/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'fom-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showModal = false;
  showEditModal = false;

  form = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    roleId: [null, [Validators.required]],
  })

  editForm = this.fb.group({
    username: [null, [Validators.required]],
    email: [null, [Validators.required]],
    roleId: [null, [Validators.required]],
  })

  name =  this.form.get('name');
  email = this.form.get('email');
  roleId = this.form.get('roleId');

  filteredUsers: UserInListDto[] = [];
  allUsers: UserInListDto[] = [];
  users$ = this.usersQuery.selectAll().pipe(
    tap(data => console.log(data)),
    tap((data) => (this.filteredUsers = this.allUsers = data))
  );
  searchTerm = '';
  selectedUser: UserInListDto = null;

  roles$ = this.rolesQuery.selectAll()

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private usersQuery: UsersQuery,
              private modal: NzModalService,
              private notification: NzNotificationService,
              private rolesQuery: RolesQuery,
              private rolesService: RolesService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe()
    this.rolesService.getActiveRoles().subscribe();
  }

  onSubmit() {
    this.feMessageService.emitError([])

    const payload: RegisterUserDto = {
      name: this.name.value,
      email: this.email.value,
      roleId: this.roleId.value
    }

    this.usersService.register(payload).subscribe(() => {
      this.usersService.clearCache();
      this.usersService.getAllUsers().subscribe()
      this.showModal = false
      this.form.reset()
      this.notification.success('Successful', `${payload.name} has been added as a user`)
    }, err => {
      this.feMessageService.emitError(err.error?.errorMessage)
    })
  }

  onUpdate() {
    // this.feMessageService.emitError([])
    // const payload: UpdateMemberInfoDto = {
    //   _id: this.selectedUser._id,
    //   firstName: this.editForm.get('firstName').value,
    //   surname: this.editForm.get('surname').value,
    //   gender: this.editForm.get('gender').value,
    //   dateOfBirth: this.editForm.get('dateOfBirth').value,
    //   phone: this.editForm.get('phone').value,
    //   email: this.editForm.get('email').value
    // }
    //
    // this.usersService.update(payload).subscribe(() => {
    //   this.usersService.clearCache();
    //   this.showEditModal = false
    //   this.form.reset()
    //   this.notification.success('Successful', 'Member details has been updated')
    // }, err => {
    //
    //   this.feMessageService.emitError(err.error?.errorMessage)
    // })
  }

  filterData(data: string) {
    this.searchTerm = data;
    if (data) {
      this.filteredUsers = this.allUsers.filter((res: UserInListDto) => {
        return (
          res.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          res.email.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          res.role?.name.toLowerCase().indexOf(data.toLowerCase()) > -1
        );
      });
    } else {
      this.filteredUsers = this.allUsers;
    }
  }

  populateForm(data: UserInListDto) {
    this.selectedUser = data;
    this.editForm.patchValue(data, {emitEvent: true})
    console.log('edit form', this.editForm.value)
  }

  deleteMember(data: UserInListDto) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this user?',
      nzContent: '<b style="color: red;">This action will will not be able to access the system after this action. Do you still like to continue?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.usersService.deleteUser(data._id).subscribe(()=> {
        this.usersService.clearCache()
        this.notification.success('Successful', `User profile of ${data.name} has been permanently deleted`)
      }, err => {
        this.notification.error('Ops! Something went wrong',err.error?.errorMessage)
      } ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
