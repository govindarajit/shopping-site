import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class CategoryService {
    private baseUrl = '';
    private headers: HttpHeaders;
    constructor(private http: HttpClient, private authService: AuthService) {
        console.log(this.authService.user.token);
        this.headers = new HttpHeaders({ 'content-type': 'application/json', authorization: this.authService.user.token });
        this.baseUrl = env.apiAddress;
    }

    getAll(): Observable<Category[]> {
        return this.http.get<any>(`${this.baseUrl}/category`, { headers: this.headers }).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
    get(id: number): Observable<Category> {
        // return this.http
        //     .get(`${this.baseUrl}/category/${id}`)
        //     .map((res: Response) => {
        //         return res.json();
        //     })
        //     .catch((error: any) => Observable.throw('Server error'));
        return this.http.get<any>(`${this.baseUrl}/category/${id}`, { headers: this.headers }).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
    add(category: Category): Observable<Response> {
        return this.http.post<any>(`${this.baseUrl}/category`, JSON.stringify(category), { headers: this.headers }).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
    update(category: Category): Observable<Response> {
        console.log('update', category);
        return this.http.put<any>(`${this.baseUrl}/category/${category._id}`, JSON.stringify(category), { headers: this.headers }).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
    delete(id: string): Observable<Response> {
        console.log('delete', id);
        return this.http.delete<any>(`${this.baseUrl}/category/${id}`).pipe(
            map((res) => res),
            catchError(<T>(error: any, result?: T) => {
                console.log(error);
                return of(result as T);
            })
        );
    }
}
