import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

import { Product } from './models/product.model';
import { ProductsService } from './services/products.service';
import { GenericErrorResponse } from './models/generic-error.response';

import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public products: Product[];
  public genericError: GenericErrorResponse;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getListOfProducts();
  }

  saveProduct(product: Product): void {
    this.genericError = undefined;

    this.productsService.save(product)
      .pipe(
        catchError(error => {
          this.genericError = error;
          return throwError(error);
        })
      )
      .subscribe(() => {
        product.setAsUpdated();
      });
  }

  onProductAdded(product: Product) {
    this.products.push(product);
  }

  private getListOfProducts() {
    this.productsService.getList().subscribe(res => {
      this.products = res;
    });
  }
}
