import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ShareModule} from "../../share/share.module";
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardLeftSideBarComponent } from './dashboard-left-side-bar/dashboard-left-side-bar.component';
import { DashboardYearViewComponent } from './dashboard-year-view/dashboard-year-view.component';
import { DashboardMonthViewComponent } from './dashboard-month-view/dashboard-month-view.component';
import { DashboardWeekViewComponent } from './dashboard-week-view/dashboard-week-view.component';
import { DashboardDayViewComponent } from './dashboard-day-view/dashboard-day-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardLeftSideBarComponent,
    DashboardYearViewComponent,
    DashboardMonthViewComponent,
    DashboardWeekViewComponent,
    DashboardDayViewComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
