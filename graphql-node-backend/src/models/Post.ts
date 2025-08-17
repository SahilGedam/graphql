import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt'> {}

export class PostInstance extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public createdAt!: Date;
}

export const Post = PostInstance.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: false
  }
);
