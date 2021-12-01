import { async, TestBed } from '@angular/core/testing'
import { WebSharedFeatureNotificationsModule } from './web-shared-feature-notifications.module'

describe('SharedFeatureNotificationsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebSharedFeatureNotificationsModule],
    }).compileComponents()
  }))

  it('should create', () => {
    expect(WebSharedFeatureNotificationsModule).toBeDefined()
  })
})
