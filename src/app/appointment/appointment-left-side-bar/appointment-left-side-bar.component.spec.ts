import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentLeftSideBarComponent } from './appointment-left-side-bar.component';

describe('AppointmentLeftSideBarComponent', () => {
  let component: AppointmentLeftSideBarComponent;
  let fixture: ComponentFixture<AppointmentLeftSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentLeftSideBarComponent]
    });
    fixture = TestBed.createComponent(AppointmentLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
