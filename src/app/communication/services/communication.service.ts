import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  private url = "http://smartcityapi.seppealaerts.be/api";

  getMessagesWithUser(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/information/withUser');
  }

  getMessage(messageID: number): Observable<Message> {
    return this.http.get<Message>(this.url + '/information/' + messageID);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(this.url + '/information/' + message.id, message);

  }




}
