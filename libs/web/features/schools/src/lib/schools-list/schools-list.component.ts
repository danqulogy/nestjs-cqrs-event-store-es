import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import { SchoolEnrollmentStatus, SchoolsInListDto } from '@fom/shared/api-dtos';
import { BehaviorSubject, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SchoolQuery, SchoolService } from '@fom/web/core';

@Component({
  selector: 'fom-members-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.scss']
})
export class SchoolsListComponent implements OnInit {
  showModal = false;
  showEditModal = false;

  form = this.fb.group({
    firstName: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    dateOfBirth: [null, []],
    phone: [null, [Validators.required]],
    email: [null, [Validators.email]]
  })

  editForm = this.fb.group({
    firstName: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    dateOfBirth: [null, []],
    phone: [null, [Validators.required]],
    email: [null, [Validators.email]]
  })

  firstName =  this.form.get('firstName');
  surname = this.form.get('surname')
  gender = this.form.get('gender')
  dateOfBirth = this.form.get('dateOfBirth')
  phone = this.form.get('phone');
  email = this.form.get('email');


  filteredSchools: SchoolsInListDto[] = [];
  allMembers: SchoolsInListDto[] = [];

  showDispatchButton$$ = new BehaviorSubject(false)
  enrolledSchools$$ = new BehaviorSubject(0)
  pendingSchools$$ = new BehaviorSubject(0)
  schoolsWithDispatchedNotice$$ = new BehaviorSubject(0)

  schools$ = this.schoolsQuery.selectAll().pipe(
    tap((data) => {
      this.filteredSchools = this.allMembers = data
      this.schoolsWithDispatchedNotice$$.next(data.filter(s => s.dispatched).length)
      this.enrolledSchools$$.next(data.filter(s => s.enrollmentStatus === SchoolEnrollmentStatus.ENROLLED).length)
      this.pendingSchools$$.next(data.filter(s => s.enrollmentStatus === SchoolEnrollmentStatus.PENDING).length)

      const undispatched: number = data.filter(d => !d.dispatched).length
      this.showDispatchButton$$.next(!!undispatched)
    })
  );
  searchTerm = '';
  selectedMember: SchoolsInListDto = null;
  enrollmentStatusEnum = SchoolEnrollmentStatus

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private schoolsQuery: SchoolQuery,
              private modal: NzModalService,
              private notification: NzNotificationService,
              private schoolsService: SchoolService) { }

  ngOnInit(): void {
    this.schoolsService.getAllSchools().subscribe()
  }

  onSubmit() {
    this.feMessageService.emitError([])

    // const payload: RegisterMemberDto = {
    //   firstName: this.firstName.value,
    //   surname: this.surname.value,
    //   gender: this.gender.value,
    //   dateOfBirth: this.dateOfBirth.value,
    //   phone: this.phone.value.e164Number,
    //   email: this.email.value
    // }
    //
    // this.schoolsService.register(payload).subscribe(() => {
    //   this.schoolsService.clearCache();
    //   this.showModal = false
    //   this.form.reset()
    //   this.notification.success('Successful', 'Members details has been added')
    // }, err => {
    //   this.feMessageService.emitError(err.error?.errorMessage)
    // })
  }

  onUpdate() {
    this.feMessageService.emitError([])
    // const payload: UpdateMemberInfoDto = {
    //   _id: this.selectedMember._id,
    //   firstName: this.editForm.get('firstName').value,
    //   surname: this.editForm.get('surname').value,
    //   gender: this.editForm.get('gender').value,
    //   dateOfBirth: this.editForm.get('dateOfBirth').value,
    //   phone: this.editForm.get('phone').value,
    //   email: this.editForm.get('email').value
    // }

    // this.schoolsService.update(payload).subscribe(() => {
    //   this.schoolsService.clearCache();
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
      this.filteredSchools = this.allMembers.filter((res: SchoolsInListDto) => {
        return (
          res.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          res.genderType.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          res.town.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          res.postalAddress.toLowerCase().indexOf(data.toLowerCase()) > -1
        );
      });
    } else {
      this.filteredSchools = this.allMembers;
    }
  }

  populateForm(data: SchoolsInListDto) {
    this.selectedMember = data;
    this.editForm.patchValue(data, {emitEvent: true})
    console.log('edit form', this.editForm.value)
  }


  dispatchEnrollmentNotification() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to dispatch enrollment notification?',
      nzContent: '<b style="color: red;">Selecting Yes will send enrollment ' +
        'notice via emails to school heads which contains a registration link for ' +
        'them to enroll their school on the Food Inventory Management System</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.schoolsService.dispatchEnrollmentNotification().subscribe(() => {
        this.schoolsService.clearCache()
        this.schoolsService.getAllSchools().subscribe()
        this.notification.success('Emails sent', 'Enrollment emails have been dispatched to school headmasters')
      }, err=> {
        this.notification.error('Ops! Something went wrong', err.error?.errorMessage)
      }),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteMember(data: SchoolsInListDto) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this member profile?',
      nzContent: '<b style="color: red;">The action is not reversible. Select Yes, if you want to continue</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.schoolsService.delete(data._id).subscribe(()=> {
        this.schoolsService.clearCache()
        this.notification.success('Successful', 'Profile has been permanently deleted')
      }, err => {
        this.notification.error('Ops! Something went wrong',err.error?.errorMessage)
      } ),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
