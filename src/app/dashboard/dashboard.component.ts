import {Component} from '@angular/core';
import {EventService} from "../../services/event.service";
import {ViewType} from "../../model/viewType";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  viewTypeEnum = ViewType
  viewType?: ViewType =ViewType.Week;

  constructor(private eventService: EventService ,) {
    this.eventService.event.view.subscribe(view => {
      this.viewType = view;
    });
  }

}
