import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHeaderComponent } from './appointment-header.component';

describe('AppointmentHeaderComponent', () => {
  let component: AppointmentHeaderComponent;
  let fixture: ComponentFixture<AppointmentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentHeaderComponent]
    });
    fixture = TestBed.createComponent(AppointmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
