import {Component} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-dashboard-year-view',
  templateUrl: './dashboard-year-view.component.html',
  styleUrls: ['./dashboard-year-view.component.scss']
})
export class DashboardYearViewComponent {
  months = [
    {
      title: 'January',
      date: moment().month(0)
    },
    {
      title: 'February',
      date: moment().month(1)
    },
    {
      title: 'March',
      date: moment().month(2)
    },
    {
      title: 'April',
      date: moment().month(3)
    },
    {
      title: 'May',
      date: moment().month(4)
    },
    {
      title: 'June',
      date: moment().month(5)
    },
    {
      title: 'July',
      date: moment().month(6)
    },
    {
      title: 'August',
      date: moment().month(7)
    },
    {
      title: 'September',
      date: moment().month(8)
    },
    {
      title: 'October',
      date: moment().month(9)
    },
    {
      title: 'November',
      date: moment().month(10)
    },
    {
      title: 'December',
      date: moment().month(11)
    },
  ]
}
