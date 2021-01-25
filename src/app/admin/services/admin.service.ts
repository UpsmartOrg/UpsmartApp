import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8000";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/api/users');
  }

  getUsersWithRole(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/api/users/withrole');
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/api/users/' + user_id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/api/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/api/users/', user);
  }
}
