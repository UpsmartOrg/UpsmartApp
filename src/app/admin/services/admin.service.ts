import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/shared/models/user-role.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private url = "http://smartcityapi.seppealaerts.be";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/api/users');
  }

  getUsersWithRoles(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/api/users/withroles');
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/api/users/' + user_id);
  }

  getUserWithRoles(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/api/users/withroles/' + user_id);
  }

  addUserWithRoles(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/api/users/withroles', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/api/users/withroles/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<UserRole>(this.url + '/api/users/' + id);
  }
}
