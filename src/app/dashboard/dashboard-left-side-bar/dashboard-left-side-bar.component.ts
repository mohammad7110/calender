import {Component} from '@angular/core';
import * as moment from "moment/moment";

@Component({
  selector: 'app-dashboard-left-side-bar',
  templateUrl: './dashboard-left-side-bar.component.html',
  styleUrls: ['./dashboard-left-side-bar.component.scss']
})
export class DashboardLeftSideBarComponent {
  currentDate = moment();
  date = this.currentDate.clone();

  changeMonth(next: 'next' | 'prev') {
    if(next === 'next'){
      this.date.add(1 , 'M')
    }else{
      this.date.add(-1 , 'M')

    }
  }
}
