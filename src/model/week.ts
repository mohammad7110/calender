import * as moment from "moment";
import {Appointment} from "./appointment";

export interface Week {
  days: Array<{ date: moment.Moment, appointment?: Appointment } | null>;
}
