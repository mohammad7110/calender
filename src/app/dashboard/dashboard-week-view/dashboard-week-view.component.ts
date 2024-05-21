import {Component} from '@angular/core';
import * as moment from "moment";
import {CalenderService} from "../../../services/calender.service";
import {TimePeriods} from "../../../model/time-period";
import {Appointment} from "../../../model/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {EventService} from "../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentDetailComponent} from "../../../share/components/appointment-detail/appointment-detail.component";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-dashboard-week-view',
  templateUrl: './dashboard-week-view.component.html',
  styleUrls: ['./dashboard-week-view.component.scss']
})
export class DashboardWeekViewComponent {
  currentDate = moment()
  days: Array<{ date: moment.Moment, appointment?: Appointment }> = [];
  timePeriods = TimePeriods;
  appointments: Appointment[] = [];

  constructor(private calenderService: CalenderService, private appointmentService: AppointmentService, private eventService: EventService,
              private dialog: MatDialog) {
    this.days = this.calenderService.buildCurrentWeek(this.currentDate.clone());
    this.appointments = this.appointmentService.getAppointments();
    this.checkAppointmentInWeek();
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointmentInWeek();
    })
  }


  checkAppointmentInWeek(): void {

    this.days.forEach(d => {
      d.appointment = undefined;
    });
    this.appointments.forEach(app => {
      const appDay = moment(app.day);
      this.days.forEach(d => {
        if (d && appDay.isSame(d.date, 'd')) {
          d.appointment = app;
        }
      })
    });
  }

  openAppointment(appointment: Appointment | undefined): void {
    if (appointment) {

      this.dialog.open(AppointmentDetailComponent, {data: appointment}).afterClosed().subscribe((res) => {
        if (res) {
          this.checkAppointmentInWeek();
        }
      })
    }
  }

  drop($event: CdkDragDrop<any, any>, dayIndex: number, timeIndex: number) {
    const appointment = $event.item.data.appointment as Appointment;
    if (appointment) {
      appointment.day = this.days[dayIndex].date.toDate().getTime();
      appointment.start = TimePeriods[timeIndex].start;
      appointment.end = TimePeriods[timeIndex].end;
      this.appointmentService.modifyAppointment(appointment);

    }

  }
}
