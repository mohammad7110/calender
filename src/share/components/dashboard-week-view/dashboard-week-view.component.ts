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
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-week-view',
  templateUrl: './dashboard-week-view.component.html',
  styleUrls: ['./dashboard-week-view.component.scss']
})
export class DashboardWeekViewComponent {
  currentDate = moment()
  days: Array<{ date: moment.Moment, appointment?: Appointment; appointmentLength?: number }> = [];
  timePeriods = TimePeriods;
  appointments: Appointment[] = [];

  editMode = false;

  constructor(private calenderService: CalenderService, private appointmentService: AppointmentService, private eventService: EventService,
              private dialog: MatDialog, private router: Router) {
    const url = this.router.url;
    this.editMode = url.indexOf('appointment') >0;
    this.appointments = this.appointmentService.getAppointments();
    this.createDays(this.currentDate.clone());
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointmentInWeek();
    })
    this.eventService.event.date.subscribe(date => {
      this.createDays(date.clone());
    })
  }

  createDays(date: moment.Moment): void {
    this.days = this.calenderService.buildCurrentWeek(date);
    this.checkAppointmentInWeek();
  }


  checkAppointmentInWeek(): void {

    this.days.forEach(d => {
      d.appointment = undefined;
    });
    this.appointments.forEach(app => {
      const appDay = moment(app.day);
      this.days.forEach(d => {
        if (d && appDay.isSame(d.date, 'd')) {
          const duration = moment(app.end, 'HH').hour() - moment(app.start, 'HH').hour();

          d.appointment = app;
          d.appointmentLength = duration;
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
      const duration = moment(appointment.end, 'HH').hour() - moment(appointment.start, 'HH').hour();
      appointment.day = this.days[dayIndex].date.toDate().getTime();
      appointment.start = TimePeriods[timeIndex].start;
      appointment.end = moment(moment(appointment.start, 'HH').minute(0).hour() + duration, 'HH').format('HH:mm');
      this.appointmentService.modifyAppointment(appointment);

    }

  }

  goToEdit(event: MouseEvent, appointment?: Appointment): void {
    if (appointment) {
      event.stopPropagation();
      this.router.navigate(['/appointment', appointment.id])
    }
  }
}
