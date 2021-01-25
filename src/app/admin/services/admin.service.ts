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

  getUserWithRole(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/api/users/withrole/' + user_id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/api/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/api/users/withroles/' + user.id, user);
  }

  addUserRole(userRole: UserRole): Observable<UserRole> {
    return this.http.post<UserRole>(this.url + '/api/userroles/', userRole);
  }

  deleteUserRole(id: number) {
    return this.http.delete<UserRole>(this.url + '/api/userroles/' + id);
  }
}
