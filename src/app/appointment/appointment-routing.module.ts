import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppointmentComponent} from "./appointment.component";

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent
  },
  {
    path: ':id',
    component: AppointmentComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
