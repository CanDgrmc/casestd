import express, { type Express, type Response } from "express";
import type { Sequelize } from "sequelize";
import DB from "../data/DB.ts";
import {
  Book,
  assoc as BookModelAssoc,
  init as BookModelInit,
} from "../data/models/Book.ts";
import {
  User,
  assoc as UserModelAssoc,
  init as UserModelInit,
} from "../data/models/User.ts";
import { init as UserBookBorrowModelInit } from "../data/models/UserBookBorrow.ts";
import BookRepository from "../data/repositories/BookRepository.ts";
import UserRepository from "../data/repositories/UserRepository.ts";
import type { IApplication, IConfig } from "../types/core/IApplication";
import { ApplicationError } from "../utils/ApplicationError.ts";
import { Logger } from "../utils/Logger.ts";

import bodyParser from "body-parser";
import booksModuleConfig from "../modules/books/module.init.ts";
import usersModuleConfig from "../modules/users/module.init.ts";
import type { IRepositories } from "../types/core/IModule.ts";

export default class ApplicationBuilder implements IApplication {
  config?: IConfig;
  db?: DB;
  app?: Express;
  logger = Logger.createLogger();
  repositories: IRepositories = {};

  constructor() {}

  setConfig(config: IConfig) {
    this.config = config;
    return this;
  }

  private buildRepositories(db: Sequelize) {
    // initialize models
    const models = [UserModelInit, BookModelInit, UserBookBorrowModelInit];
    models.map((i) => i(db));

    // initialize associations
    const associations = [UserModelAssoc, BookModelAssoc];
    associations.map((i) => i());

    // register repositories
    this.repositories.userRepository = new UserRepository(User);
    this.repositories.bookRepository = new BookRepository(Book);
  }

  private buildModules() {
    const modules = [usersModuleConfig, booksModuleConfig];
    modules.map((module) => {
      const router = module.init(this.repositories);
      this.app?.use(`/${module.prefix}`, router);
    });
  }

  async build() {
    if (!this.config?.db) {
      throw new ApplicationError("DB configs not defined");
    }

    this.app = express();
    this.app.use(bodyParser.json());

    this.db = DB.getInstance(this.config.db);
    if (!this.db.client) {
      throw new ApplicationError("DB client not found");
    }

    await this.db.client.authenticate();

    this.buildRepositories(this.db.client);
    this.buildModules();

    // migrate
    await this.db.client.sync({
      force: this.config.db.forceMigration,
    });

    this.app.get("/", (_, res: Response) => {
      res.json({
        hello: "world",
      });
    });
  }

  run() {
    if (!this.app) {
      throw new ApplicationError("App could not be created");
    }

    this.app.listen(this.config?.port, () => {
      this.logger.info(`App is running on ${this.config?.port}`);
    });
  }
}
