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

  private url = "https://pacific-castle-78822.herokuapp.com";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  getUsersWithRoles(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users/withroles');
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/get/' + user_id);
  }

  getUserWithRoles(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/get/' + user_id + '/withroles');
  }

  addUserWithRoles(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/users/withroles', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/users/withroles/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<UserRole>(this.url + '/users/' + id);
  }
}
