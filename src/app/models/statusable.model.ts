import { Exclude } from 'class-transformer';
import { STATUSES } from './status.model';

export abstract class Statusable {

  @Exclude({toPlainOnly: true})
  protected status: STATUSES;

  isActivated() {
    return this.status === STATUSES.ACTIVE;
  }
}
