import type { Book } from "../../../data/models/Book";

export type ListBooksResponse = Book[] | undefined;
export type CreateBookRequest = {
  name: string;
};
export type CreateBookResponse = Book | undefined;
export type GetBookResponse = Book | undefined;
