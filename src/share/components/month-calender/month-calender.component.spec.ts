import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCalenderComponent } from './month-calender.component';

describe('MonthCalenderComponent', () => {
  let component: MonthCalenderComponent;
  let fixture: ComponentFixture<MonthCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCalenderComponent]
    });
    fixture = TestBed.createComponent(MonthCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
