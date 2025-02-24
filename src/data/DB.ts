import { Sequelize } from "sequelize";
import type { IDBConfig } from "../types/core/IApplication";
export default class DB {
  static instance: DB;
  client?: Sequelize;
  constructor(configs: IDBConfig) {
    this.client = new Sequelize({
      username: configs.user,
      port: configs.port,
      password: configs.password,
      database: configs.name,
      host: configs.host,
      dialect: configs.dialect,
      logging: configs.logQueries,
    });
  }

  static getInstance(configs: IDBConfig) {
    if (!this.instance) {
      this.instance = new DB(configs);
    }

    return this.instance;
  }
}
