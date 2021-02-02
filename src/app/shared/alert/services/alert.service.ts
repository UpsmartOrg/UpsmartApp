import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor() { }

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  success(messageTitle: string, messageBody: string) {
    this.alert(new Alert({ type: AlertType.Success, messageTitle, messageBody }));
  }

  error(messageTitle: string, messageBody: string) {
    this.alert(new Alert({ type: AlertType.Error, messageTitle, messageBody }));
  }

  info(messageTitle: string, messageBody: string) {
    this.alert(new Alert({ type: AlertType.Info, messageTitle, messageBody }));
  }

  warn(messageTitle: string, messageBody: string) {
    this.alert(new Alert({ type: AlertType.Warning, messageTitle, messageBody }));
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
