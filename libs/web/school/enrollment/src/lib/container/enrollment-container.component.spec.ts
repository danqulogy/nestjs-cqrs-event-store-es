import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentContainerComponent } from './enrollment-container.component';

describe('ContainerComponent', () => {
  let component: EnrollmentContainerComponent;
  let fixture: ComponentFixture<EnrollmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
