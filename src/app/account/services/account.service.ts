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
    console.log(username, password)
    return this.http.post<User>("/login", { username, password })
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
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

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/users/', user);
  }
}
