import { Exclude, Expose } from 'class-transformer';
import { STATUSES } from './status.enum';
import { EXPOSE_KEYS } from '../configs/expose-ui-groups.conts';
import { Traceable } from './traceable.model';

export class Product extends Traceable {

  @Expose({groups: [EXPOSE_KEYS.UI_ONLY]})
  id: string;

  @Expose({name: 'product_description'})
  productDescription: string;

  @Exclude()
  protected status: STATUSES;

  name: string;
  price: number;

  isActivated() {
    return this.price > 100 ? STATUSES.ACTIVE : STATUSES.INACTIVE;
  }

  constructor(id: string, name: string, description: string, price: number) {
    super();

    this.id = id;
    this.name = name;
    this.price = price;
    this.productDescription = description;
  }

  getProductDescription(): string {
    return this.productDescription;
  }
}
