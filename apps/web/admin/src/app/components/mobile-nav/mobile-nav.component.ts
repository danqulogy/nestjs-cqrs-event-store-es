import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@fom/web/core';

@Component({
  selector: 'fom-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
  }

}
