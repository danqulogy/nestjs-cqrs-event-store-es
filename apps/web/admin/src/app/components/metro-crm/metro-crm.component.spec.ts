import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroCrmComponent } from './metro-crm.component';

describe('MetroCrmComponent', () => {
  let component: MetroCrmComponent;
  let fixture: ComponentFixture<MetroCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetroCrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetroCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
