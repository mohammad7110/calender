import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthViewComponent } from './dashboard-month-view.component';

describe('DashboardMonthViewComponent', () => {
  let component: DashboardMonthViewComponent;
  let fixture: ComponentFixture<DashboardMonthViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMonthViewComponent]
    });
    fixture = TestBed.createComponent(DashboardMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
