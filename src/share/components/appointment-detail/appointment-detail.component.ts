import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../../model/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment, private dialogRef: MatDialogRef<AppointmentDetailComponent>,
              private appointmentService: AppointmentService,
              private router: Router
  ) {
  }

  close() {
    this.dialogRef.close()
  }


  delete(): void {

    this.appointmentService.deleteAppointment(this.data.id ?? '');
    this.dialogRef.close(true)
  }


  edit(): void {
    this.router.navigate(['/appointment', this.data.id])
    this.dialogRef.close();
  }
}
