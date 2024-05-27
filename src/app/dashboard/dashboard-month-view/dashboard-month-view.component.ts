import {Component} from '@angular/core';
import * as moment from "moment";
import {Week} from "../../../model/week";
import {WeeksName} from "../../../model/weeksName";
import {CalenderService} from "../../../services/calender.service";
import {Appointment} from "../../../model/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {EventService} from "../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentDetailComponent} from "../../../share/components/appointment-detail/appointment-detail.component";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-dashboard-month-view',
  templateUrl: './dashboard-month-view.component.html',
  styleUrls: ['./dashboard-month-view.component.scss']
})
export class DashboardMonthViewComponent {
  currentDate = moment()
  weeks: Week[] = [];
  appointments: Appointment[] = [];

  weeksName = WeeksName;

  constructor(private calenderService: CalenderService, private appointmentService: AppointmentService, private eventService: EventService,
              private dialog: MatDialog
  ) {
    this.createWeeks(this.currentDate.clone());
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointmentInMonth();
    })
    this.eventService.event.date.subscribe(date => {
      this.createWeeks(date.clone());
    });

  }


  createWeeks(date: moment.Moment): void {
    this.weeks = this.calenderService.buildWeeks(moment(date.clone(), 'YYYY/MM/DD').month(),
      moment(date.clone(), 'YYYY/MM/DD').year());
    this.appointments = this.appointmentService.getAppointments();
    this.checkAppointmentInMonth();
  }

  checkAppointmentInMonth(): void {
    this.weeks.forEach(w => {
      w.days.forEach(d => {
        if (d) {
          d.appointment = undefined;
        }
      })
    });

    this.appointments.forEach(app => {
      const appDay = moment(app.day);
      this.weeks.forEach(w => {
        w.days.forEach(d => {
          if (d && appDay.isSame(d.date, 'd')) {
            d.appointment = app;
          }
        })
      })
    });
  }

  openAppointment(appointment: Appointment | undefined): void {
    if (appointment) {

      this.dialog.open(AppointmentDetailComponent, {data: appointment}).afterClosed().subscribe((res) => {
        if (res) {
          this.checkAppointmentInMonth();
        }
      })
    }
  }

  drop($event: CdkDragDrop<any, any>, weekIndex: number, dayIndex: number) {
    const dest = this.weeks[weekIndex].days[dayIndex];
    const source = this.weeks[$event.item.data.weekIndex].days[$event.item.data.dayIndex]
    if (dest && source) {
      const appointment = source.appointment;
      if (appointment) {
        appointment.day = dest.date.toDate().getTime();
        this.appointmentService.modifyAppointment(appointment);
      }
    }

  }
}
