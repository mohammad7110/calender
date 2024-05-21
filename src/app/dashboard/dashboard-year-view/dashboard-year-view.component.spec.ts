import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardYearViewComponent } from './dashboard-year-view.component';

describe('DashboardYearViewComponent', () => {
  let component: DashboardYearViewComponent;
  let fixture: ComponentFixture<DashboardYearViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardYearViewComponent]
    });
    fixture = TestBed.createComponent(DashboardYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
