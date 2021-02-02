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

  private userSubject: BehaviorSubject<any>;
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
    return this.http.post<User>(this.url + '/logout', this.currentUser).subscribe(
      () => {
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        console.log(this.currentUser)
      }
    );
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
    if (this.currentUser.id) {
      return true;
    } else {
      return false
    }
  }

  isAdmin() {
    if (this.currentUser.id) {
      this.currentUser.user_roles?.forEach(userRole => {
        switch (parseInt(userRole.role_id.toString())) {
          case 1:
            return false
          case 2:
            return false
          case 3:
            return false
          case 4:
            return true
          default:
            return false
        }
      })
    } else {
      return false
    }

    return false

  }

  isGroendienst() {
    if (this.currentUser.id) {
      this.currentUser.user_roles?.forEach(userRole => {
        switch (parseInt(userRole.role_id.toString())) {
          case 1:
            return true
          case 2:
            return false
          case 3:
            return false
          case 4:
            return false
          default:
            return false
        }
      })
    } else {
      return false
    }

    return false

  }

  isParticipatie() {
    if (this.currentUser.id) {
      this.currentUser.user_roles?.forEach(userRole => {
        switch (parseInt(userRole.role_id.toString())) {
          case 1:
            return false
          case 2:
            return true
          case 3:
            return false
          case 4:
            return false
          default:
            return false
        }
      })
    } else {
      return false
    }

    return false

  }

  isCommunicatie() {
    if (this.currentUser.id) {
      this.currentUser.user_roles?.forEach(userRole => {
        switch (parseInt(userRole.role_id.toString())) {
          case 1:
            return false
          case 2:
            return false
          case 3:
            return true
          case 4:
            return false
          default:
            return false
        }
      })
    } else {
      return false
    }

    return false

  }
}
