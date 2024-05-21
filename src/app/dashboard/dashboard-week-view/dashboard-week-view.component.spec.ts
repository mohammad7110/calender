import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWeekViewComponent } from './dashboard-week-view.component';

describe('DashboardWeekViewComponent', () => {
  let component: DashboardWeekViewComponent;
  let fixture: ComponentFixture<DashboardWeekViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardWeekViewComponent]
    });
    fixture = TestBed.createComponent(DashboardWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
