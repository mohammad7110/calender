import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDayViewComponent } from './dashboard-day-view.component';

describe('DashboardDayViewComponent', () => {
  let component: DashboardDayViewComponent;
  let fixture: ComponentFixture<DashboardDayViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDayViewComponent]
    });
    fixture = TestBed.createComponent(DashboardDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
