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

  private userRolesSubject: BehaviorSubject<any>;
  public userRoles: Observable<User>;
  adminRole = false;
  groendienstRole = false;
  participatieRole = false;
  communicatieRole = false;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    this.user.subscribe(x => this.currentUser = x);

    this.userRolesSubject = new BehaviorSubject<any>(null);
    this.userRoles = this.userSubject.asObservable();
    this.loadRoles();
  }

  private url = "https://smartcityapi.seppealaerts.site/api";

  login(username: string, password: string) {
    return this.http.post<User>(this.url + "/login", { "email": username, "password": password })
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.loadRoles();
        return user;
      }));
  }

  logout() {
    return this.http.post<User>(this.url + '/logout', this.currentUser).subscribe(
      () => {
        sessionStorage.removeItem('user');
        this.userSubject.next({});
        this.user = this.userSubject.asObservable();
        this.adminRole = this.groendienstRole = this.communicatieRole = this.participatieRole = false;
      }
    );
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/get/' + user_id);
  }

  getUserWithRoles(user_id: number): Observable<User> {
    return this.http.get<User>(this.url + '/users/get/' + user_id + '/withroles');
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
    if (this.adminRole) {
      return true
    } else {
      return false
    }
  }

  isGroendienst() {
    if (this.groendienstRole || this.adminRole) {
      return true
    } else {
      return false
    }
  }

  isParticipatie() {
    if (this.participatieRole || this.adminRole) {
      return true
    } else {
      return false
    }
  }

  isCommunicatie() {
    if (this.communicatieRole || this.adminRole) {
      return true
    } else {
      return false
    }
  }

  loadRoles() {
    this.getUserWithRoles(this.currentUser.id).subscribe(
      result => {
        result.user_roles?.forEach(userRole => {
          switch (parseInt(userRole.role_id.toString())) {
            case 1:
              this.groendienstRole = true;
              break;
            case 2:
              this.participatieRole = true;
              break;
            case 3:
              this.communicatieRole = true;
              break;
            case 4:
              this.adminRole = true;
              break;
            default:
              break;
          }
        })
        this.userRolesSubject = new BehaviorSubject<User>(result)
        this.userRoles = this.userSubject.asObservable();
        this.userSubject.next(result);
      },
      error => this.adminRole = this.groendienstRole = this.communicatieRole = this.participatieRole = false
    )

  }
}
