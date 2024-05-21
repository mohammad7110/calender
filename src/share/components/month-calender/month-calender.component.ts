import {Component, Input, OnChanges} from '@angular/core';
import * as moment from "moment/moment";
import {CalenderService} from "../../../services/calender.service";
import {Week} from "../../../model/week";
import {WeeksName} from "../../../model/weeksName";
import {AppointmentService} from "../../../services/appointment.service";
import {EventService} from "../../../services/event.service";
import {Appointment} from "../../../model/appointment";


@Component({
  selector: 'app-month-calender',
  templateUrl: './month-calender.component.html',
  styleUrls: ['./month-calender.component.scss']
})
export class MonthCalenderComponent implements OnChanges {
  @Input() date?: string;
  currentDate = moment()
  weeks: Week[] = [];
  appointments: Appointment[] = [];

  weeksName = WeeksName;

  constructor(private calenderService: CalenderService, private appointmentService: AppointmentService, private eventService: EventService) {
    this.appointments = this.appointmentService.getAppointments();
    this.checkAppointments();
    this.eventService.event.appointments.subscribe(res => {
      this.appointments = res;
      this.checkAppointments();
    })
  }

  ngOnChanges(): void {
    if (this.date) {
      this.weeks = this.calenderService.buildWeeks(moment(this.date, 'YYYY/MM/DD').month(), moment(this.date, 'YYYY/MM/DD').year());
      this.checkAppointments()
    }
  }

  checkAppointments(): void {
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


}
