import { gql } from 'apollo-server-express';
import { User, Post, Comment } from './models';
import Book from './models/Book';
import { PostInstance } from './models/Post';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    posts: [Post!]
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    user: User!
    comments: [Comment!]
    commentCount: Int!
  }

  type Comment {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
    post: Post!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    users: [User!]
    posts: [Post!]
    post(id: ID!): Post!     
    comments: [Comment!]
    books: [Book!]
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String!, author: String!): Book!
    deleteBook(id: ID!): Boolean!

  createPost(title: String!, content: String!, userId: ID!): Post!
  updatePost(id: ID!, title: String!, content: String!): Post!
  deletePost(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    users: async () =>
      await User.findAll({
        include: [
          { model: Post, as: 'posts' },
          { model: Comment, as: 'comments' }
        ]
      }),

    posts: async () =>
      await Post.findAll({
        include: [
          { model: User, as: 'user' },
          { model: Comment, as: 'comments' }
        ]
      }),

    post: async (_: any, { id }: { id: number }) => {
      return await Post.findByPk(id, {
        include: [
          { model: User, as: 'user' },
          { model: Comment, as: 'comments', include: [{ model: User, as: 'user' }] }
        ]
      });
    },

    comments: async () =>
      await Comment.findAll({
        include: [
          { model: User, as: 'user' },
          { model: Post, as: 'post' }
        ]
      }),

    books: async () => await Book.findAll(),

    book: async (_: any, { id }: { id: number }) => {
      return await Book.findByPk(id);
    }
  },

  Mutation: {
    createBook: async (_: any, { title, author }: { title: string; author: string }) => {
      return await Book.create({ title, author });
    },

    updateBook: async (_: any, { id, title, author }: { id: number; title: string; author: string }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error('Book not found');
      book.title = title;
      book.author = author;
      await book.save();
      return book;
    },

    deleteBook: async (_: any, { id }: { id: number }) => {
      const book = await Book.findByPk(id);
      if (!book) return false;
      await book.destroy();
      return true;
    },

    createPost: async (_: any, { title, content, userId }: { title: string; content: string; userId: number }) => {
      return await Post.create({ title, content, userId, createdAt: new Date() });
    },

    updatePost: async (_: any, { id, title, content }: { id: number; title: string; content: string }) => {
      const post = await Post.findByPk(id);
      if (!post) throw new Error('Post not found');

      (post as PostInstance).title = title;
      (post as PostInstance).content = content;

      await post.save();
      return post;
    },



    deletePost: async (_: any, { id }: { id: number }) => {
      const post = await Post.findByPk(id);
      if (!post) return false;
      await post.destroy();
      return true;
    }
  },

  User: {
    posts: async (parent) => await Post.findAll({ where: { userId: parent.id } }),
    comments: async (parent) => await Comment.findAll({ where: { userId: parent.id } })
  },

  Post: {
    user: async (parent) => await User.findByPk(parent.userId),
    comments: async (parent) => await Comment.findAll({ where: { postId: parent.id } }),
    commentCount: async (parent) => await Comment.count({ where: { postId: parent.id } })
  },

  Comment: {
    user: async (parent) => await User.findByPk(parent.userId),
    post: async (parent) => await Post.findByPk(parent.postId)
  }
};
