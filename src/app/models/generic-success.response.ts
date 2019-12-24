export class GenericSuccessResponse {
  private message: string;
  private data: any;

  getMessage() {
    return this.message;
  }

  getData() {
    return this.data;
  }
}
