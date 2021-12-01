import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { AuthenticationService } from '@fom/web/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { noop } from 'rxjs';

@Component({
  selector: 'fom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  progressRef : NgProgressRef;

  form = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(4)]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private notificationService: NzNotificationService,
              // private schoolService: SchoolsService,
              private ngProgress: NgProgress,
              ) { }

  email = this.form.controls.username;
  password = this.form.controls.password



  ngOnInit(): void {
    this.progressRef = this.ngProgress.ref()
  }

  login() {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    this.authService.login(
      {
        strategy: 'local',
        email: this.email.value,
        password: this.password.value,
      }
    ).subscribe(() => noop(), err => {
      console.log('Login error: ',err)
      this.notificationService.error('Ops! Incorrect Credentials', err.error?.errorMessage)
    })
  }
}
