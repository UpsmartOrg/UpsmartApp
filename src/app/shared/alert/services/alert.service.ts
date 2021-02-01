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

  success(message: string) {
    this.alert(new Alert({ type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
    console.log(message);
    this.alert(new Alert({ type: AlertType.Error, message }));
  }

  info(message: string) {
    this.alert(new Alert({ type: AlertType.Info, message }));
  }

  warn(message: string) {
    this.alert(new Alert({ type: AlertType.Warning, message }));
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
