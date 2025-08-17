import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface BookAttributes {
  id: number;
  title: string;
  author: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'books'
  }
);

export default Book;
