import { ApiError } from "./ApiError.ts";

export default class ApiResponse<T> {
  data?;
  err?: ApiError;
  success: boolean;
  constructor(data: T | null, success: boolean = true, error?: ApiError) {
    this.success = success;

    if (success) {
      this.data = data;
    } else {
      this.err = error;
    }
  }
}
