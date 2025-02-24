import type { Dialect } from "sequelize";

export type IDBConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  dialect: Dialect;
  logQueries: boolean;
  forceMigration: boolean;
};

export type IConfig = {
  port: string;
  db: IDBConfig;
};

export type IApplication = {
  setConfig: (config: IConfig) => IApplication;
  build: () => Promise<void>;
  run: () => void;
};
