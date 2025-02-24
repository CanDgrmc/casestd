import RepositoryBase from "../../core/RepositoryBase.ts";
import type { UserBookBorrow } from "../models/UserBookBorrow.ts";

export type IUserBookBorrowRepository = {
  bookRatingSummary: (id: string) => Promise<number>;
};

export default class UserBookBorrowRepository
  extends RepositoryBase<typeof UserBookBorrow>
  implements IUserBookBorrowRepository
{
  async bookRatingSummary(id: string): Promise<number> {
    return 0;
  }
}
