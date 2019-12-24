import { Expose } from 'class-transformer';
import { STATUSES } from './status.model';
import { Statusable } from './statusable.model';
import { applyMixins } from '../helpers/apply-mixin.fn';
import { EXPOSE_KEYS } from '../configs/expose-ui-groups.conts';

export interface Product extends Statusable {
  id: string;
  name: string;
  price: number;
}

export class Product {

  @Expose({groups: [EXPOSE_KEYS.UI_ONLY]})
  id: string;
  name: string;
  price: number;

  constructor(id: string, name: string, price: number, status: STATUSES) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.status = status;
  }

  getProductDescription(): string {
    return `${this.name} is currently ${this.status}.`;
  }
}

applyMixins(Product, [Statusable]);
