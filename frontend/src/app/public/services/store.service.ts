import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Product } from '../../models/product';
import { Cart } from '../models/cart';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class StoreService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' });
  }
  GetProducts(): Observable<Product[]> {
    return this.http.get<any>(env.apiAddress + '/store').pipe(
      map((response) => {
        return response;
      }),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }

  SaveCart(cart: Cart): Observable<string> {
    return this.http.post<any>(env.apiAddress + '/store/cart', JSON.stringify(cart), { headers: this.headers }).pipe(
      map((res) => res),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
}
