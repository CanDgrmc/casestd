import {
  DataTypes,
  Model,
  Sequelize,
  type BelongsToManyCountAssociationsMixin,
  type BelongsToManyGetAssociationsMixin,
  type BelongsToManyHasAssociationMixin,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "sequelize";
import { User } from "./User.ts";
import { UserBookBorrow } from "./UserBookBorrow.ts";

export const tableName = "books";

export class Book extends Model<
  InferAttributes<
    Book,
    { omit: "users" | "countUsers" | "getUsers" | "hasUser" }
  >,
  InferCreationAttributes<
    Book,
    { omit: "id" | "createdAt" | "updatedAt" | "users" }
  >
> {
  declare id: number;
  declare name: string;
  declare countUsers: BelongsToManyCountAssociationsMixin;
  declare getUsers: BelongsToManyGetAssociationsMixin<User>;
  declare hasUser: BelongsToManyHasAssociationMixin<User, User["id"]>;
  declare users?: NonAttribute<User[]>;
  declare borrows?: NonAttribute<UserBookBorrow[]>;
  declare borrow?: NonAttribute<UserBookBorrow>;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const init = (sequelize: Sequelize) => {
  Book.init(
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
  Book.belongsToMany(User, {
    through: UserBookBorrow,
    foreignKey: "bookId",
    otherKey: "userId",
    as: "users",
  });
};
