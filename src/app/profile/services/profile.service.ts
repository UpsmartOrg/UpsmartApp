import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8000";

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/api/users/' + user_id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/api/users/', user);
  }
}
