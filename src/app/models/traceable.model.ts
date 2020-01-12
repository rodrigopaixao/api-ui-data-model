import { Exclude } from 'class-transformer';

export abstract class Traceable {

  @Exclude()
  protected isNewStatus: boolean;

  @Exclude()
  protected isUpdatedStatus: boolean;

  get isNew() {
    return this.isNewStatus;
  }

  get isUpdated() {
    return this.isUpdatedStatus;
  }

  setAsNew() {
    this.isNewStatus = true;

    this.cancelHighlight();
  }

  setAsUpdated() {
    this.isUpdatedStatus = true;

    this.cancelHighlight();
  }

  private cancelHighlight() {
    setTimeout(() => {
      this.isNewStatus = false;
      this.isUpdatedStatus = false;
    }, 2000);
  }
}
