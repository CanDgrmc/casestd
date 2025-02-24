import type { Book } from "../../../data/models/Book";
import type { User } from "../../../data/models/User";

export type ListUsersResponse = User[];

export type CreateUserRequest = {
  name: string;
};

export type CreateUserResponse = User | undefined;
export type GetUserResponse = {
  id: Number;
  name: String;
  books: {
    past: {
      id: Number;
      name: String;
    }[];
    present: {
      id: Number;
      name: String;
    }[];
  };
};

export type BorrowBookRequest = {
  userId: string;
  bookId: string;
};
export type BorrowBookResponse = Book[] | undefined;

export type BorrowBookCompleteProcessRequest = {
  userId: string;
  bookId: string;
  score: number;
};
export type BorrowBookCompleteProcessResponse = boolean | undefined;
