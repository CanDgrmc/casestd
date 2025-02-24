import type { Router } from "express";
import type { IBookRepository } from "../../data/repositories/BookRepository";
import type { IUserRepository } from "../../data/repositories/UserRepository";

export type IRepositories = {
  [key: string]: IUserRepository | IBookRepository;
};

export type IModuleConfig = {
  init: (repositories: IRepositories) => Router;
  prefix: string;
};
