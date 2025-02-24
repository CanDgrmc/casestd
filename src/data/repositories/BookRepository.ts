import { Sequelize } from "sequelize";
import RepositoryBase from "../../core/RepositoryBase.ts";
import type { CreateBookRequest } from "../../modules/books/schemas/books.schema.ts";
import type { Book } from "../models/Book.ts";

export type IBookRepository = {
  list: () => Promise<Book[]>;
  create: (payload: CreateBookRequest) => Promise<Book>;
  getByPk: (id: string) => Promise<Book | null>;
  getByPkWithScore: (id: string) => Promise<Book | null>;
};

export default class BookRepository
  extends RepositoryBase<typeof Book>
  implements IBookRepository
{
  async list(): Promise<Book[]> {
    const data = await this.model.findAll({ attributes: ["id", "name"] });
    return data;
  }

  async create(payload: CreateBookRequest): Promise<Book> {
    const data = await this.model.create(payload);
    return data;
  }

  async getByPk(id: string): Promise<Book | null> {
    const data = await this.model.findByPk(id, {
      attributes: ["id", "name"],
    });
    return data;
  }

  async getByPkWithScore(id: string): Promise<Book | null> {
    const data = await this.model.findOne({
      where: { id },
      subQuery: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(
              'FORMAT(COALESCE((SELECT SUM(user_book_borrows.rating) / COUNT(user_book_borrows.user_id) FROM user_book_borrows where user_book_borrows.book_id=Book.id and user_book_borrows.status="completed"), -1),2)'
            ),
            "score",
          ],
        ],
      },
    });
    return data;
  }
}
