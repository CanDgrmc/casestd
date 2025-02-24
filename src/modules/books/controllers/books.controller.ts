import { ControllerBase } from "../../../core/ControllerBase.ts";
import { ResponseDecorator } from "../../../core/ResponseDecorator.ts";
import ApiResponse from "../../../utils/ApiResponse.ts";
import type BookService from "../books.service.ts";
import type {
  CreateBookRequest,
  CreateBookResponse,
  ListBooksResponse,
} from "../schemas/books.schema.ts";

export default class BookController extends ControllerBase<BookService> {
  async listBooks(): Promise<ApiResponse<ListBooksResponse>> {
    const res = await ResponseDecorator<ListBooksResponse>(
      this.service.listBooks()
    );
    return res;
  }

  async createBook(
    payload: CreateBookRequest
  ): Promise<ApiResponse<CreateBookResponse>> {
    const res = await ResponseDecorator<CreateBookResponse>(
      this.service.createBook(payload)
    );

    return res;
  }

  async getBook(id: string): Promise<ApiResponse<CreateBookResponse>> {
    const res = await ResponseDecorator<CreateBookResponse>(
      this.service.getBook(id)
    );

    return res;
  }
}
