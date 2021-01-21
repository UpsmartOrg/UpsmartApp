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
}
