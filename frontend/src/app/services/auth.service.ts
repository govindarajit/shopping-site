import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../public/models/userLogin';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment as env } from '../../environments/environment';

declare const localStorage: any;

@Injectable()
export class AuthService {
    headers: HttpHeaders;
    user: User;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'content-type': 'application/json' });
        this.loadAuthUser();
    }
    loadAuthUser() {
        if (localStorage.authInfo !== undefined && localStorage.authInfo !== null) {
            this.user = JSON.parse(localStorage.authInfo);
        }
    }
    SignOut() {
        localStorage.removeItem('authInfo');
        this.user = undefined;
    }
    setAuthUser(user: User) {
        localStorage.authInfo = JSON.stringify(user);
        this.user = user;
    }

    ValidateUser(user: UserLogin): Observable<User> {
        return this.http.post<any>(env.apiAddress + '/login', JSON.stringify(user), { headers: this.headers }).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
}
