import Winston from "winston";

export class Logger {
  static createLogger(source: string = "Application"): Winston.Logger {
    return Winston.createLogger({
      level: "info",
      format: Winston.format.json(),
      defaultMeta: { source },
      transports: [
        new Winston.transports.Console({
          format: Winston.format.json(),
        }),
      ],
    });
  }
}

export type LoggerType = Winston.Logger;
