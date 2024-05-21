import {Component} from '@angular/core';
import * as moment from 'moment'
import {FormControl} from "@angular/forms";
import {ViewType} from "../../../model/viewType";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  date = moment();
  viewType = new FormControl(ViewType.Year);
  viewTypes = [ViewType.Day, ViewType.Week, ViewType.Month, ViewType.Year]

  constructor(private eventService: EventService) {
    this.viewType.valueChanges.subscribe((res) => {
      if (res)
        this.eventService.changeView(res);
    })
  }

}
