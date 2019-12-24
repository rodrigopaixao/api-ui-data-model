export class GenericErrorResponse {
  private status: number;
  private message: string;

  isBadRequest() {
    return this.status === 400;
  }

  isServerError() {
    return this.status === 500;
  }

  getMessage() {
    return this.message;
  }
}
