import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ViewType} from "../model/viewType";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly publishers = {
    view: new Subject<ViewType>()
  }

  public readonly event = {
    view: this.publishers.view.asObservable()
  }

  constructor() {
  }

  changeView(viewType: ViewType): void {
    this.publishers.view.next(viewType);
  }
}
