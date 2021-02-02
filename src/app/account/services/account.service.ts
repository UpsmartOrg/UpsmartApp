import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  currentUser!: User;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    this.user.subscribe(x => this.currentUser = x);
  }

  private url = "http://smartcityapi.seppealaerts.be/api";

  login(username: string, password: string) {
    return this.http.post<User>(this.url + "/login", { "email": username, "password": password })
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/' + user_id);
  }

  getUserWithRoles(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/withroles/' + user_id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/users/' + user.id, user);
  }

  updatePassword(user: User, oldPassword: string, newPassword: string) {
    return this.http.post<User>(this.url + '/change-password', { "oldPassword": oldPassword, "user": user.id, "newPassword": newPassword })
  }

  isLoggedIn() {
    if (sessionStorage.getItem("user")) {
      return true;
    } else {
      return false
    }
  }
}
