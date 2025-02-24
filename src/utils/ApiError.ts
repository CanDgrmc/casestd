export class ApiError {
  code?: number;
  message?: string;
  constructor(
    message?: string,
    options?: {
      code: number;
    }
  ) {
    this.message = message;
    this.code = options?.code;
  }
}
