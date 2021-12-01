import { Observable } from 'rxjs'
import { FeMessagesService } from '../fe-messages.service'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'fe-messages',
  templateUrl: './fe-messages.component.html',
  styleUrls: ['./fe-messages.component.scss']
})
export class FeMessagesComponent implements OnInit{
  errors$: Observable<string[]>
  @Input() closeable= true
  @Input() title = 'Some errors occurred: ';

  constructor(private feMessagesService: FeMessagesService) {
  }

  ngOnInit(): void {
    this.errors$ =  this.feMessagesService.errors$
  }

  close(){
    this.feMessagesService.emitError([])
  }
}
