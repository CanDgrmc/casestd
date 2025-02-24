import { Logger } from "./Logger.ts";

export class ApplicationError extends Error {
  constructor(
    message?: string,
    options?: {
      code: string;
    }
  ) {
    const logger = Logger.createLogger();
    logger.error({
      message,
      code: options?.code || "00",
    });
    super(message);
  }
}
