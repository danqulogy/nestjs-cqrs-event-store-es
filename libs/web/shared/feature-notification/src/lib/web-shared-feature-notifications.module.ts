import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeMessagesComponent } from './fe-messages/fe-messages.component'
import { NzAlertModule } from 'ng-zorro-antd/alert'

@NgModule({
  imports: [CommonModule, NzAlertModule],
  declarations:[FeMessagesComponent],
  exports: [FeMessagesComponent]
})
export class WebSharedFeatureNotificationsModule {}
