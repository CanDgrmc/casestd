import type {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Book } from "./Book.ts";
import { UserBookBorrow } from "./UserBookBorrow.ts";

export const tableName = "users";

export class User extends Model<
  InferAttributes<User, { omit: "books" | "past" | "present" }>,
  InferCreationAttributes<
    User,
    {
      omit:
        | "id"
        | "books"
        | "past"
        | "present"
        | "getBooks"
        | "createdAt"
        | "updatedAt";
    }
  >
> {
  declare id: Number;
  declare name: String;
  declare getBooks: BelongsToManyGetAssociationsMixin<Book>;
  declare addBook: BelongsToManyAddAssociationMixin<Book, Book["id"]>;

  declare books?: NonAttribute<Book[]>;
  declare past?: NonAttribute<Book[]>;
  declare present?: NonAttribute<Book[]>;
  declare static associations: {
    books: Association<User, Book>;
  };
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
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
  User.belongsToMany(Book, {
    through: UserBookBorrow,
    foreignKey: "userId",
    otherKey: "bookId",
    as: "books",
  });
};
