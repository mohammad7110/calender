import {Component} from '@angular/core';
import {TimePeriods} from "../../../model/time-period";
import * as moment from "moment/moment";
import {Appointment} from "../../../model/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {EventService} from "../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentDetailComponent} from "../../../share/components/appointment-detail/appointment-detail.component";

@Component({
  selector: 'app-dashboard-day-view',
  templateUrl: './dashboard-day-view.component.html',
  styleUrls: ['./dashboard-day-view.component.scss']
})
export class DashboardDayViewComponent {
  currentDate = moment()

  timePeriods = TimePeriods;
  appointments: Appointment[] = [];
  appointment: Appointment | undefined;

  constructor(private appointmentService: AppointmentService, private eventService: EventService,
              private dialog: MatDialog) {
    this.appointments = this.appointmentService.getAppointments();
    this.checkAppointmentInDay();
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointmentInDay();
    })
  }

  checkAppointmentInDay(): void {

    this.appointment = undefined;
    this.appointments.forEach(app => {
      const appDay = moment(app.day);
      if (this.currentDate.isSame(appDay, 'd')) {
        this.appointment = app;
      }

    });
  }

  openAppointment(appointment: Appointment | undefined): void {
    if (appointment) {

      this.dialog.open(AppointmentDetailComponent, {data: appointment}).afterClosed().subscribe((res) => {
        if (res) {
          this.checkAppointmentInDay();
        }
      })
    }
  }


}
