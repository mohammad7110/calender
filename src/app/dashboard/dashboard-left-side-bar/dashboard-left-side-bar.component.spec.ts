import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeftSideBarComponent } from './dashboard-left-side-bar.component';

describe('DashboardLeftSideBarComponent', () => {
  let component: DashboardLeftSideBarComponent;
  let fixture: ComponentFixture<DashboardLeftSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLeftSideBarComponent]
    });
    fixture = TestBed.createComponent(DashboardLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
