import {Component} from '@angular/core';
import {TimePeriods} from "../../../model/time-period";
import * as moment from "moment/moment";
import {Appointment} from "../../../model/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {EventService} from "../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentDetailComponent} from "../../../share/components/appointment-detail/appointment-detail.component";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-day-view',
  templateUrl: './dashboard-day-view.component.html',
  styleUrls: ['./dashboard-day-view.component.scss']
})
export class DashboardDayViewComponent {
  currentDate = moment();
  date = this.currentDate.clone();
  appointmentLength?: number;

  timePeriods = TimePeriods;
  appointments: Appointment[] = [];
  appointment: Appointment | undefined;

  constructor(private appointmentService: AppointmentService, private eventService: EventService,
              private dialog: MatDialog,
              private router : Router) {
    this.appointments = this.appointmentService.getAppointments();
    this.checkAppointmentInDay();
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointmentInDay();
    })
    this.eventService.event.date.subscribe(date => {
      this.date = date.clone();
      this.checkAppointmentInDay();

    })
  }

  checkAppointmentInDay(): void {

    this.appointment = undefined;
    this.appointmentLength = undefined;
    this.appointments.forEach(app => {
      const appDay = moment(app.day);
      if (this.date.isSame(appDay, 'd')) {
        this.appointment = app;

        const duration = moment(app.end, 'HH').hour() - moment(app.start, 'HH').hour();
        this.appointmentLength = duration;

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


  drop($event: CdkDragDrop<any, any>, timeIndex: number) {
    $event.event.stopPropagation();
    if (this.appointment) {
      const duration = moment(this.appointment.end, 'HH').hour() - moment(this.appointment.start, 'HH').hour();
      this.appointment.start = TimePeriods[timeIndex].start;
      this.appointment.end = moment(moment(this.appointment.start, 'HH').minute(0).hour() + duration, 'HH').format('HH:mm');
      this.appointmentService.modifyAppointment(this.appointment);

    }
  }

  goToEdit(event: MouseEvent, appointment: Appointment) :void{
    event.stopPropagation();
    this.router.navigate(['/appointment', appointment.id])

  }
}
