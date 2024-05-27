import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonthCalenderComponent} from './components/month-calender/month-calender.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import {RouterModule} from "@angular/router";
import {DashboardWeekViewComponent} from "./components/dashboard-week-view/dashboard-week-view.component";


@NgModule({
  declarations: [
    MonthCalenderComponent,
    AppointmentDetailComponent,
    DashboardWeekViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    MonthCalenderComponent,
    DashboardWeekViewComponent
  ]
})
export class ShareModule {
}
