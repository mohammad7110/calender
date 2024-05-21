import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ViewType} from "../model/viewType";
import {Appointment} from "../model/appointment";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly publishers = {
    view: new Subject<ViewType>(),
    appointments: new Subject<Appointment[]>()
  }

  public readonly event = {
    view: this.publishers.view.asObservable(),
    appointments: this.publishers.appointments.asObservable()

  }

  constructor() {
  }

  changeView(viewType: ViewType): void {
    this.publishers.view.next(viewType);
  }

  changeAppointments(appointments: Appointment[]): void {
    this.publishers.appointments.next(appointments);
  }
}
