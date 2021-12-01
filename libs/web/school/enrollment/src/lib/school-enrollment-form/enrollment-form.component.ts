import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { FeMessagesService } from '@fom/web/shared/feature-notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EnrollSchoolDto, RegisterMemberDto } from '@fom/shared/api-dtos';
import { SchoolQuery, SchoolService } from '@fom/web/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fom-contact-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit {

  form = this.fb.group({
    schoolName: [{ value: null, disabled: true }, [Validators.required]],
    genderType: [{ value: null, disabled: true }, [Validators.required]],
    region: [{ value: null, disabled: true }, [Validators.required]],
    headTeacherName: [{ value: null, disabled: true }, [Validators.required]],
    headTeacherEmail: [{ value: null, disabled: true }, [Validators.required]],
    password: [null, [Validators.required]],
    totalPopulation: [null, [Validators.required]],
    numberOfDayStudents: [null, [Validators.required]],
    numberOfBoardingStudents: [null, [Validators.required]],

  })

  firstName =  this.form.get('firstName');
  surname = this.form.get('surname')
  gender = this.form.get('gender')
  dateOfBirth = this.form.get('dateOfBirth')
  phone = this.form.get('phone');
  email = this.form.get('email');

  prefferedCountries = [CountryISO.Ghana, CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Canada]
  searchCountryFields = [SearchCountryField.Iso2, SearchCountryField.Name]
  selectedCountryISO = CountryISO.Ghana;

  submitted = false

  constructor(private fb: FormBuilder,
              private feMessageService: FeMessagesService,
              private membersQuery: SchoolQuery,
              private modal: NzModalService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private schoolQuery: SchoolQuery,
              private schoolService: SchoolService,
              private notification: NzNotificationService,
              private membersService: SchoolService) {
    console.log('QUERY_PARAMS', this.activatedRoute.snapshot.queryParams['code'])

    this.schoolService.getSchoolByEnrollmentKey(this.activatedRoute.snapshot.queryParams['code']).subscribe( res=>{
      console.log('school', res)
      this.form.get('schoolName').setValue(res.name)
      this.form.get('genderType').setValue(res.genderType)
      this.form.get('region').setValue(res.region)
      this.form.get('headTeacherName').setValue(res.headTeacher.name)
      this.form.get('headTeacherEmail').setValue(res.headTeacher.email)
    })

  }

  ngOnInit(): void {
    console.log('form init')

  }


  onSubmit() {
    this.feMessageService.emitError([])

    this.form.markAllAsTouched()
    this.form.markAsDirty();

    if (this.form.invalid && (this.form.dirty || this.form.touched)) {
      this.feMessageService.emitError('Please complete all required information')
    }

    const payload: EnrollSchoolDto = {
      enrollmentKey: this.activatedRoute.snapshot.queryParams['code'],
      password: this.form.get('password').value,
      totalNumberOfStudents: this.form.get('totalPopulation').value,
      totalNumberOfBoardingStudents: this.form.get('numberOfBoardingStudents').value,
      totalNumberOfDayStudents: this.form.get('numberOfDayStudents').value,
    }

    this.schoolService.enroll(payload).subscribe(() => {
      this.membersService.clearCache();
      this.form.reset()
      this.submitted = true;
      this.notification.success('Successful', 'Your school has been enrolled successfully on the Food Inventory Management System')
    }, err => {
      this.feMessageService.emitError(err.error?.errorMessage)
      this.notification.error('Ops! Something went wrong', err.error?.errorMessage)
      this.submitted  = false
    })
  }

  back() {
    this.submitted = false;
  }
}
