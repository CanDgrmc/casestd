import { ServiceBase } from "../../core/ServiceBase.ts";
import { BorrowProcessStatuses } from "../../data/models/UserBookBorrow.ts";
import type { IBookRepository } from "../../data/repositories/BookRepository.ts";
import type { IUserRepository } from "../../data/repositories/UserRepository.ts";
import { ApiError } from "../../utils/ApiError.ts";
import type {
  BorrowBookCompleteProcessRequest,
  BorrowBookCompleteProcessResponse,
  BorrowBookRequest,
  BorrowBookResponse,
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  ListUsersResponse,
} from "./schemas/users.schema.ts";

export default class UserService extends ServiceBase<{
  userRepository: IUserRepository;
  bookRepository: IBookRepository;
}> {
  async listUsers(): Promise<ListUsersResponse> {
    const result = await this.repositories.userRepository.list();

    return result;
  }

  async createUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
    const result = await this.repositories.userRepository.create(payload);

    return result;
  }

  async getUser(id: string): Promise<GetUserResponse> {
    const result = await this.repositories.userRepository.getWithBorrowHistory(
      id
    );

    const past = [];
    const present = [];

    if (!result) {
      throw new ApiError(`user not found ID:${id}`, {
        code: 404,
      });
    }

    if (result.books && result.books.length) {
      for (let book of result.books) {
        if (book.borrow) {
          if (book.borrow.status == BorrowProcessStatuses.BORROWED) {
            present.push({ id: book.id, name: book.name });
          } else if (book.borrow.status == BorrowProcessStatuses.COMPLETED) {
            past.push({ id: book.id, name: book.name });
          }
        }
      }
    }

    return {
      id: result.id,
      name: result.name,
      books: { past, present },
    };
  }

  async borrowBook(payload: BorrowBookRequest): Promise<BorrowBookResponse> {
    const user = await this.repositories.userRepository.getByPk(payload.userId);

    if (!user) {
      throw new ApiError(`user not found ID:${payload.userId}`, {
        code: 404,
      });
    }

    const book = await this.repositories.bookRepository.getByPk(payload.bookId);

    if (!book) {
      throw new ApiError(`book not found ID:${payload.bookId}`, {
        code: 404,
      });
    }

    const countBorrowed = await book.countUsers({
      where: {
        "$UserBookBorrow.status$": BorrowProcessStatuses.BORROWED,
      },
    });

    if (!!countBorrowed) {
      throw new ApiError(`book is already taken bookID: ${payload.bookId}`);
    }

    await user.addBook(book, {
      through: { status: BorrowProcessStatuses.BORROWED },
    });

    const res = await user.getBooks({
      attributes: ["id", "name"],
      where: {
        "$UserBookBorrow.status$": BorrowProcessStatuses.BORROWED,
      },
      joinTableAttributes: [],
    });

    return res;
  }

  async completeBorrowProcess(
    payload: BorrowBookCompleteProcessRequest
  ): Promise<BorrowBookCompleteProcessResponse> {
    const user = await this.repositories.userRepository.getByPk(payload.userId);

    if (!user) {
      throw new ApiError(`user not found ID:${payload.userId}`, {
        code: 404,
      });
    }

    const book = await this.repositories.bookRepository.getByPk(payload.bookId);

    if (!book) {
      throw new ApiError(`book not found ID:${payload.bookId}`, {
        code: 404,
      });
    }

    const borrowedByUser = await book.hasUser(user.id, {
      where: {
        "$UserBookBorrow.status$": BorrowProcessStatuses.BORROWED,
      },
    });

    if (!borrowedByUser) {
      throw new ApiError(`book is not borrowed by user`);
    }

    await user.addBook(book.id, {
      through: {
        status: BorrowProcessStatuses.COMPLETED,
        rating: payload.score,
      },
    });

    return true;
  }
}
