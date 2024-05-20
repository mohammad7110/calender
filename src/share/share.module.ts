import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonthCalenderComponent} from './components/month-calender/month-calender.component';


@NgModule({
  declarations: [
    MonthCalenderComponent
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
