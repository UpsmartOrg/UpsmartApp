import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert/services/alert.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

    constructor(private router: Router, private alertService: AlertService) {
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
                    this.alertService.error('Er is iets misgelopen...', 'Je hebt geen toestemming om deze actie te ondernemen.')
                }
                return throwError("unauthorized");
            }));
    }
}