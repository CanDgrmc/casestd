import {
  DataTypes,
  Model,
  Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { Book } from "./Book.ts";
import { User } from "./User.ts";

export const tableName = "user_book_borrows";

export const BorrowProcessStatuses = {
  BORROWED: "borrowed",
  COMPLETED: "completed",
};
export class UserBookBorrow extends Model<
  InferAttributes<UserBookBorrow>,
  InferCreationAttributes<UserBookBorrow>
> {
  declare bookId: string;
  declare userId: string;
  declare rating: number;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const init = (sequelize: Sequelize) => {
  UserBookBorrow.init(
    {
      bookId: {
        type: DataTypes.INTEGER,
        field: "book_id",
        autoIncrement: false,
        references: {
          model: Book,
          key: "id",
        },
      },
      userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(...Object.values(BorrowProcessStatuses)),
        defaultValue: BorrowProcessStatuses.BORROWED,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName,
    }
  );
};

export const assoc = () => {
  UserBookBorrow.belongsTo(Book, {
    foreignKey: "bookId",
    as: "book",
  });
  UserBookBorrow.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};
