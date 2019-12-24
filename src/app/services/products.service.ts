import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';
import { Product } from '../models/product.model';
import { EXPOSE_KEYS } from '../configs/expose-ui-groups.conts';
import { GenericErrorResponse } from '../models/generic-error.response';
import { GenericSuccessResponse } from '../models/generic-success.response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }

  getList(): Observable<Product[]> {
    return this.httpClient.get('/api/products')
      .pipe(
        take(1),
        map(res => plainToClass(Product, res as Product[], {
          groups: [EXPOSE_KEYS.UI_ONLY]
        })),
      );
  }

  create(product: Product): Observable<GenericSuccessResponse> {
    const payload = classToPlain(product);

    return this.httpClient.post('/api/products', payload)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          const newError = plainToClass(GenericErrorResponse, error.error);
          return throwError(newError);
        }),
        mergeMap((res) => of(plainToClass(GenericSuccessResponse, res))),
      );
  }

  save(product: Product): Observable<GenericSuccessResponse> {
    const payload = classToPlain(product, {groups: [EXPOSE_KEYS.UI_ONLY]});

    return this.httpClient.put('/api/products', payload)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          const newError = plainToClass(GenericErrorResponse, error.error);
          return throwError(newError);
        }),
        mergeMap((res) => of(plainToClass(GenericSuccessResponse, res))),
      );
  }
}
