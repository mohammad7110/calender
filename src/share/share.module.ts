import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonthCalenderComponent} from './components/month-calender/month-calender.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';


@NgModule({
  declarations: [
    MonthCalenderComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MonthCalenderComponent
  ]
})
export class ShareModule {
}
