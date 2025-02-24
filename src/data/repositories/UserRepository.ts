import RepositoryBase from "../../core/RepositoryBase.ts";
import type { CreateUserRequest } from "../../modules/users/schemas/users.schema.ts";
import { Book } from "../models/Book.ts";
import type { User } from "../models/User.ts";

export interface IUserRepository {
  list: () => Promise<User[]>;
  create(payload: CreateUserRequest): Promise<User>;
  getByPk(id: string): Promise<User | null>;
  getWithBorrowHistory(id: string): Promise<User | null>;
}

export default class UserRepository
  extends RepositoryBase<typeof User>
  implements IUserRepository
{
  async list(): Promise<User[]> {
    const data = await this.model.findAll();
    return data;
  }

  async create(payload: CreateUserRequest): Promise<User> {
    const data = await this.model.create(payload);
    return data;
  }

  async getByPk(id: string): Promise<User | null> {
    const data = await this.model.findByPk(id);
    return data;
  }

  async getWithBorrowHistory(id: string): Promise<User | null> {
    const data = await this.model.findOne({
      where: { id },
      include: [
        {
          model: Book,
          through: {
            attributes: ["status"],
            as: "borrow",
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },

          as: "books",
        },
      ],
    });
    return data;
  }
}
