import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { UUID } from 'angular2-uuid';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GenericSuccessResponse } from '../../models/generic-success.response';
import { GenericErrorResponse } from '../../models/generic-error.response';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductFormComponent implements OnInit {

  @Output()
  onSaveSuccessfully: EventEmitter<Product> = new EventEmitter();

  public form: FormGroup;
  public successResponse: GenericSuccessResponse;
  public genericError: GenericErrorResponse;

  constructor(private productsService: ProductsService,
              private formBuilder: FormBuilder,
              protected changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initForm();
  }

  createProduct(): void {
    if (this.form.valid) {

      const product = new Product(UUID.UUID(),
        this.form.value.name,
        this.form.value.description,
        this.form.value.price);

      this.productsService.create(product)
        .pipe(
          catchError(error => {
            this.genericError = error;
            return throwError(error);
          })
        )
        .subscribe(res => {
          this.successResponse = res;

          product.setAsNew();

          this.onSaveSuccessfully.emit(product);

          this.hideSuccessMessage();
        });
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  private hideSuccessMessage() {
    setTimeout(() => {
      this.successResponse = null;

      this.changeDetectorRef.markForCheck();
    }, 2000);
  }
}
