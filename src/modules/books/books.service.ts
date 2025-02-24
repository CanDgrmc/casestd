import { ServiceBase } from "../../core/ServiceBase.ts";
import type { IBookRepository } from "../../data/repositories/BookRepository.ts";
import { ApiError } from "../../utils/ApiError.ts";
import type {
  CreateBookRequest,
  CreateBookResponse,
  GetBookResponse,
  ListBooksResponse,
} from "./schemas/books.schema.ts";

export default class BookService extends ServiceBase<{
  bookRepository: IBookRepository;
}> {
  async listBooks(): Promise<ListBooksResponse> {
    const result = await this.repositories.bookRepository.list();

    return result;
  }

  async createBook(payload: CreateBookRequest): Promise<CreateBookResponse> {
    const result = await this.repositories.bookRepository.create(payload);

    return result;
  }

  async getBook(id: string): Promise<GetBookResponse> {
    const result = await this.repositories.bookRepository.getByPkWithScore(id);
    if (!result) {
      throw new ApiError(`book not found ID:${id}`, {
        code: 404,
      });
    }

    return result;
  }
}
