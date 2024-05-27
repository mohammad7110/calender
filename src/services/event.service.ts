import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Appointment} from "../model/appointment";
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly publishers = {
    appointments: new Subject<Appointment[]>(),
    date: new Subject<moment.Moment>()
  }

  public readonly event = {
    appointments: this.publishers.appointments.asObservable(),
    date: this.publishers.date.asObservable()
  }

  constructor() {
  }


  changeAppointments(appointments: Appointment[]): void {
    this.publishers.appointments.next(appointments);
  }

  changeDate(date: moment.Moment): void {
    this.publishers.date.next(date);
  }
}
