import {Injectable} from '@angular/core';
import {Appointment} from "../model/appointment";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [];

  constructor(private eventService: EventService) {
    const appointments = sessionStorage.getItem('appointments');
    if (appointments) {
      this.appointments = JSON.parse(appointments);
      this.appointments = this.appointments.filter(a => a.save);
    }
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  addAppointment(appointment: Appointment) {
    if (appointment.id) {
      let appIndex = this.appointments.findIndex(a => a.id === appointment.id);
      if (appIndex >= 0) {
        this.appointments[appIndex] = appointment;
      } else {
        this.appointments.push(appointment);
      }
    }
    this.eventService.changeAppointments(this.appointments);
  }

  saveAppointment(): void {
    this.appointments.forEach(app => {
      app.save = true;
    })
    sessionStorage.setItem('appointments', JSON.stringify(this.appointments))
  }

  discardAppointment(): void {
    this.appointments = this.appointments.filter(a => a.save);
    this.eventService.changeAppointments(this.appointments);

  }


  createRandomString(length = 15): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  deleteAppointment(id: string) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index >= 0) {
      this.appointments.splice(index, 1)
      this.saveAppointment();
      this.eventService.changeAppointments(this.appointments);
    }
  }

  modifyAppointment(appointment: Appointment): void {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index >= 0) {
      this.appointments[index] = appointment;
    }
    console.log(this.appointments)
    this.saveAppointment();
    this.eventService.changeAppointments(this.appointments);
  }
}
