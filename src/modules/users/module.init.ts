import { Router } from "express";
import type { IBookRepository } from "../../data/repositories/BookRepository.ts";
import type { IUserRepository } from "../../data/repositories/UserRepository";
import type { IModuleConfig, IRepositories } from "../../types/core/IModule";
import UserController from "./controllers/users.controller.ts";
import routes from "./users.route.ts";
import UserService from "./users.service.ts";

const moduleConfig: IModuleConfig = {
  init: (repositories: IRepositories) => {
    const router = Router();
    const userService = new UserService({
      userRepository: repositories.userRepository as IUserRepository,
      bookRepository: repositories.bookRepository as IBookRepository,
    });

    const userController = new UserController(userService);

    routes(router, userController);

    return router;
  },

  prefix: "users",
};

export default moduleConfig;
