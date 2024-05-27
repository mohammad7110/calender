import {Component} from '@angular/core';
import * as moment from 'moment'
import {FormControl} from "@angular/forms";
import {ViewType} from "../../../model/viewType";
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  date = moment();
  viewType = new FormControl(ViewType.Year);
  viewTypeEnum = ViewType;
  viewTypes = [ViewType.Day, ViewType.Week, ViewType.Month, ViewType.Year]

  constructor(private eventService: EventService, private router: Router) {
    this.patchValidViewType()
    this.viewType.valueChanges.subscribe((res) => {
      if (res) {
        this.router.navigate([res.toLowerCase()]);
      }
    })
  }

  patchValidViewType(): void {
    const url = this.router.url;
    if (url.indexOf(ViewType.Year.toLowerCase()) >= 0) {
      this.viewType.patchValue(ViewType.Year, {emitEvent: false})

    } else if (url.indexOf(ViewType.Day.toLowerCase()) >= 0) {
      this.viewType.patchValue(ViewType.Day, {emitEvent: false})

    } else if (url.indexOf(ViewType.Week.toLowerCase()) >= 0) {
      this.viewType.patchValue(ViewType.Week, {emitEvent: false})
    } else {
      this.viewType.patchValue(ViewType.Month, {emitEvent: false})
    }
  }

  changeDate(action: 1 | -1): void {
    if (this.viewType.value === ViewType.Month) {
      this.date.add(action, 'month');
    } else if (this.viewType.value === ViewType.Year) {
      this.date.add(action, 'year');

    } else if (this.viewType.value === ViewType.Week) {
      this.date.add(action, 'week');

    } else {
      this.date.add(action, 'day');

    }
    this.eventService.changeDate(this.date)

  }

  goToToday():void {
    this.date = moment();
    this.eventService.changeDate(this.date);

  }
}
