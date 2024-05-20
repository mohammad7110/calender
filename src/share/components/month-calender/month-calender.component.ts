import {Component, Input, OnChanges} from '@angular/core';
import * as moment from "moment/moment";
import {CalenderService} from "../../../services/calender.service";
import {Week} from "../../../model/week";
import {WeeksName} from "../../../model/weeksName";


@Component({
  selector: 'app-month-calender',
  templateUrl: './month-calender.component.html',
  styleUrls: ['./month-calender.component.scss']
})
export class MonthCalenderComponent implements OnChanges {
  @Input() date?: string;
  currentDate = moment()
  weeks: Week[] = [];


  weeksName = WeeksName;

  constructor(private calenderService: CalenderService) {
  }

  ngOnChanges(): void {
    if (this.date) {
      this.weeks = this.calenderService.buildWeeks(moment(this.date, 'YYYY/MM/DD').month(), moment(this.date, 'YYYY/MM/DD').year());
    }

  }


}
