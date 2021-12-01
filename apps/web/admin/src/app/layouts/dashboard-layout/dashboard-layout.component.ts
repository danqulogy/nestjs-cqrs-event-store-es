import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@fom/web/core';

@Component({
  selector: 'fom-main',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  visible = false;

  authUser$ = this.authService.user$

  constructor(private  authService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
  }

  toggle() {
    this.visible = !this.visible;
  }
}
