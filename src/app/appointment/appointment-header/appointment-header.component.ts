import {Component} from '@angular/core';
import * as moment from "moment/moment";

@Component({
  selector: 'app-appointment-header',
  templateUrl: './appointment-header.component.html',
  styleUrls: ['./appointment-header.component.scss']
})
export class AppointmentHeaderComponent {
  date = moment();

}
