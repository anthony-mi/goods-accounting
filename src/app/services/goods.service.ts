import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Goods } from '../entities/goods';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

    private apiUrl = 'api/goods';
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) {     }

    getGoods(): Observable<Goods[]>  {
        // return this.http.get<Goods[]>(this.apiUrl)
        //     .pipe(
        //         catchError(error => {
        //             console.error(error);
        //             return of(new Array<Goods>());
        //         })
        // );

        const g1 = new Goods(1, 'First', 5, 50, 70, 2);
        const g2 = new Goods(2, 'Second', 2, 30, 50, 3);
        const g3 = new Goods(3, 'Third', 0, 100, 140, 10);

        return of([g1, g2, g3]);
    }

    createGoods(goods: Goods): Observable<Goods> {
        return this.http.post<Goods>(this.apiUrl, goods, {headers: this.headers})
          .pipe(
            catchError(error => {
                console.error(`Goods ${goods.name} doesn't created. Server error: ${error}`);
                return of(undefined);
            })
          );
      }

    updateGoods(goods: Goods): Observable<Goods> {
        return this.http.put<Goods>(this.apiUrl, goods, {headers: this.headers})
          .pipe(
            catchError(error => {
                console.error(`Goods ${goods.name} doesn't updated. Server error: ${error}`);
                return of(undefined);
            })
          );
      }

    deleteGoods(goods: Goods): Observable<{}> {
        const url = `${this.apiUrl}/${goods.id}`;
        return this.http.delete(url, {headers: this.headers})
          .pipe(
            catchError(error => {
                console.error(`Goods ${goods.name} doesn't removed. Server error: ${error}`);
                return of(undefined);
            })
          );
      }
}
