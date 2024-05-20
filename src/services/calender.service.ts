import {Injectable} from '@angular/core';
import * as moment from "moment";
import {Week} from "../model/week";
import {Moment} from "moment";

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor() {
  }

  buildWeeks(month: number, year: number): Week[] {
    const weeks: Week[] = [];
    const date = moment();
    date.month(month);
    date.year(year)
    date.date(1);
    while (date.month() === month) {
      weeks.push({
        days: this.buildDays(date.clone(), month)
      })
      date.add(1, 'w');
      date.days(0)
    }
    return weeks;
  }

  buildDays(start: moment.Moment, month: number): Array<moment.Moment | null> {
    const days: Array<moment.Moment | null> = [];
    for (let i = 0; i < 7; i++) {
      if (start.day() === i && start.month() === month) {
        days.push(start.clone())
        start.add(1, 'd');
      } else {
        days.push(null)
      }
    }
    return days;
  }

  buildCurrentWeek(date: moment.Moment): Array<moment.Moment> {
    date.add(-1 * date.weekday(), 'd');
    const days: Array<moment.Moment> = [];

    for (let i = 0; i < 7; i++) {
      days.push(date.clone())
      date.add(1, 'd');
    }
    return days;
  }
}
