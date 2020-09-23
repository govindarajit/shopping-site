import { Product } from '../../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class ProductService {
  private baseUrl = '';
  private headers: any;
  private options;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json', authorization: this.authService.user.token });
    // const options = {
    //   headers: this.headers,
    //   authorization: this.authService.user.token
    // };
    // this.options = new RequestOptions({ headers: new HttpHeaders({ authorization: this.authService.user.token,
    //  'Content-Type': 'application/json' }) });
    this.baseUrl = env.apiAddress;
  }

  getAll(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}/product`, { headers: this.headers }).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
  get(id: string): Observable<Product> {
    return this.http.get<any>(`${this.baseUrl}/product/${id}`, { headers: this.headers }).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
  add(product: Product): Observable<Response> {
    return this.http.post<any>(`${this.baseUrl}/product`, JSON.stringify(product), { headers: this.headers }).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
  update(product: Product): Observable<Response> {
    // return this.http
    //   .put(`${this.baseUrl}/product/${product._id}`, JSON.stringify(product), { headers: this.headers })
    //   .catch((error: any) => Observable.throw('Server error'));

    return this.http.put<any>(`${this.baseUrl}/product/${product._id}`, JSON.stringify(product), { headers: this.headers }).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
  delete(id: string): Observable<Response> {
    return this.http.delete<any>(`${this.baseUrl}/product/${id}`).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
}
