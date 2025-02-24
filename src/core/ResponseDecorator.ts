import { ApiError } from "../utils/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import { Logger } from "../utils/Logger.ts";

export async function ResponseDecorator<T>(
  fn: Promise<T>
): Promise<ApiResponse<T | undefined>> {
  const logger = Logger.createLogger();
  try {
    const result: T = await fn;
    return new ApiResponse(result);
  } catch (err) {
    console.error(err);
    logger.error(err);

    if (err instanceof ApiError) {
      return new ApiResponse(undefined, false, {
        message: err.message,
        code: err.code,
      });
    } else if (err instanceof Error) {
      return new ApiResponse(undefined, false, {
        message: `Opps! Unhandled Error > ${err.message}`,
      });
    } else {
      return new ApiResponse(undefined, false, {
        message: `Opps! Unknown Error!`,
      });
    }
  }
}
