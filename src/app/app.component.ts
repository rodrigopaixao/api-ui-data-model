import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';

import { STATUSES } from './models/status.model';
import { Product } from './models/product.model';
import { GenericErrorResponse } from './models/generic-error.response';
import { GenericSuccessResponse } from './models/generic-success.response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public products$: Observable<Product[]>;
  public successResponse: GenericSuccessResponse;
  public genericError: GenericErrorResponse;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getList();
  }

  saveProduct(product: Product): void {
    this.genericError = undefined;
    this.successResponse = undefined;

    this.productsService.save(product)
      .subscribe(
        res => {
          this.successResponse = res;
        },
        error => {
          this.genericError = error;
        });
  }

  createProduct(): void {
    const product = new Product(UUID.UUID(), 'Product D', 200, STATUSES.ACTIVE);

    this.productsService.create(product)
      .subscribe(res => {
        this.successResponse = res;
      }, err => {
        this.genericError = err;
      });
  }
}
