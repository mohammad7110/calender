import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../appointment/appointment.component';
import {AppointmentRoutingModule} from "./appointment-routing.module";
import { AppointmentLeftSideBarComponent } from './appointment-left-side-bar/appointment-left-side-bar.component';
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    AppointmentComponent,
    AppointmentLeftSideBarComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
