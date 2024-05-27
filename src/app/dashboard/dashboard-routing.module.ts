import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardDayViewComponent} from "./dashboard-day-view/dashboard-day-view.component";
import {DashboardWeekViewComponent} from "../../share/components/dashboard-week-view/dashboard-week-view.component";
import {DashboardMonthViewComponent} from "./dashboard-month-view/dashboard-month-view.component";
import {DashboardYearViewComponent} from "./dashboard-year-view/dashboard-year-view.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'day',
        component: DashboardDayViewComponent
      },
      {
        path: 'week',
        component: DashboardWeekViewComponent
      },
      {
        path: 'month',
        component: DashboardMonthViewComponent
      },
      {
        path: 'year',
        component: DashboardYearViewComponent
      },
      {

        path: '**',
        redirectTo: 'month',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
