import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TimePeriods} from "../../../model/time-period";
import {AppointmentService} from "../../../services/appointment.service";
import {Appointment} from "../../../model/appointment";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map} from "rxjs";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-appointment-left-side-bar',
  templateUrl: './appointment-left-side-bar.component.html',
  styleUrls: ['./appointment-left-side-bar.component.scss']
})
export class AppointmentLeftSideBarComponent {

  durationOptions = [
    {
      key: '30 minutes',
      value: 0.5
    },
    {
      key: '1 hour',
      value: 1
    },
    {
      key: '1.5 hour',
      value: 1.5
    },
    {
      key: '2 hours',
      value: 2
    },


  ]

  startOptions: { title: string, start: string, end: string }[] = []
  endOptions: { title: string, start: string, end: string }[] = [];
  formGroup: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router, private route: ActivatedRoute,
              private eventService: EventService) {
    this.route.paramMap
      .pipe(
        map((paramMap: ParamMap) => (paramMap?.get('id') ?? '')),
        map((id?: string) => this.appointmentService.getAppointmentById(id))
      )
      .subscribe((appointment: Appointment | undefined) => {
        this.formGroup = this.formBuilder.group({
          id: [appointment ? appointment.id : this.appointmentService.createRandomString()],
          title: [appointment ? appointment.title : '', [Validators.required]],
          duration: [appointment ? appointment.duration : 1, [Validators.required]],
          day: [appointment ? new Date(appointment.day) : new Date(), [Validators.required]],
          start: [appointment ? appointment.start : TimePeriods[5].start, [Validators.required]],
          end: [appointment ? appointment.end : TimePeriods[7].start, [Validators.required]],
        }, {validators: this.checkTimePeriod})
        this.startOptions = [...TimePeriods];
        this.endOptions = [...TimePeriods];

        this.formGroup.get('start')?.valueChanges.subscribe((res) => {
          if (res && res.trim().length > 0) {
            this.startOptions = [...TimePeriods].filter(t => t.start.toLowerCase().indexOf(res.toLowerCase()) >= 0)
          } else {
            this.startOptions = [...TimePeriods];
          }
        })
        this.formGroup.get('end')?.valueChanges.subscribe((res) => {
          if (res && res.trim().length > 0) {
            this.endOptions = [...TimePeriods].filter(t => t.start.toLowerCase().indexOf(res.toLowerCase()) >= 0)
          } else {
            this.endOptions = [...TimePeriods];
          }
        })

        this.formGroup.valueChanges.subscribe(() => {
          this.addAppointment();
        })
      });


    this.eventService.event.appointments.subscribe(app => {
      const appId = this.formGroup.get('id')?.value;
      if (appId) {
        const appointment = app.find(a => a.id === appId);
        if (appointment) {
          const formValue = {...appointment , ...{day : new Date(appointment.day)}}
          this.formGroup.patchValue(formValue, {emitEvent: false});
        }
      }
    });

  }

  checkTimePeriod(g: FormGroup) {
    const startControl = g.get('start');
    const endControl = g.get('end')
    if (startControl && endControl && startControl.value && endControl.value && startControl.value >= endControl.value) {
      endControl.setErrors({notEquivalent: true})
    }

  }

  filter(type: 'start' | 'end') {
    const reg = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');
    if (type === 'start') {
      if (this.formGroup && !reg.test(this.formGroup.get('start')?.value)) {
        this.formGroup.get('start')?.patchValue(TimePeriods[5].start)
      }
    }
    if (type === 'end') {
      if (this.formGroup && !reg.test(this.formGroup.get('end')?.value)) {
        this.formGroup.get('end')?.patchValue(TimePeriods[7].start)
      }
    }
  }

  addAppointment(): void {
    if (this.formGroup) {
      const reg = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');
      const form = {...this.formGroup.value, ...{day: this.formGroup.value.day.getTime(), save: false}} as Appointment;
      if (form.start && form.end && form.start < form.end && reg.test(form.start) && reg.test(form.end)) {
        this.appointmentService.addAppointment(form);
      }
    }
  }

  save(): void {
    this.appointmentService.saveAppointment();
    this.router.navigate(['']).then();

  }

  close(): void {
    this.appointmentService.discardAppointment();
    this.router.navigate(['']).then();
  }
}
