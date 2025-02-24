import ApplicationBuilder from "./core/ApplicationBuilder.ts";
import type { IConfig } from "./types/core/IApplication.ts";
import { getEnvVariable } from "./utils/Env.ts";

const run = async () => {
  const config: IConfig = {
    port: getEnvVariable("PORT", "3000"),
    db: {
      host: getEnvVariable("DB_HOST"),
      port: parseInt(getEnvVariable("DB_PORT")),
      user: getEnvVariable("DB_USER"),
      password: getEnvVariable("DB_PASSWORD"),
      name: getEnvVariable("DB_NAME"),
      dialect: "mysql",
      logQueries: ["true", "TRUE"].includes(
        getEnvVariable("LOG_QUERIES", "false")
      ),
      forceMigration: ["true", "TRUE"].includes(
        getEnvVariable("FORCE_MIGRATION", "false")
      ),
    },
  };
  const application = new ApplicationBuilder();

  await application.setConfig(config).build();

  application.run();
};

run().catch(console.error);
