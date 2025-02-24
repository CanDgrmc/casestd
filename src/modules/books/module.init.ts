import { Router } from "express";
import type { IBookRepository } from "../../data/repositories/BookRepository";
import type { IModuleConfig, IRepositories } from "../../types/core/IModule";
import routes from "./books.route.ts";
import BookService from "./books.service.ts";
import BookController from "./controllers/books.controller.ts";

const moduleConfig: IModuleConfig = {
  init: (repositories: IRepositories) => {
    const router = Router();
    const bookService = new BookService({
      bookRepository: repositories.bookRepository as IBookRepository,
    });

    const bookController = new BookController(bookService);

    routes(router, bookController);

    return router;
  },

  prefix: "books",
};

export default moduleConfig;
