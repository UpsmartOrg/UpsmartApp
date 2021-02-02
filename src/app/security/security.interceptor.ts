import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { AccountService } from '../account/services/account.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = JSON.parse(sessionStorage.getItem('user') || '{}')
        let token = user.token;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.router.navigate(['403']);
                }
                return throwError("unauthorized");
            }));
    }
}