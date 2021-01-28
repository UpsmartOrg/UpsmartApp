import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageAdd } from 'src/app/shared/models/message-add.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';

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

  postMessage(message: MessageAdd): Observable<MessageAdd> {
    return this.http.post<MessageAdd>(this.url + '/information', message);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(this.url + '/information/' + message.id, message);
  }

  deleteMessage(id: number) {
    return this.http.delete<Message>(this.url + '/information/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }




}
