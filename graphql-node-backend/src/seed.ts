import sequelize from "./db";
import Book from "./models/Book";
const User: any = require('./models').User;
const Post: any = require('./models').Post;
const Comment: any = require('./models').Comment;



const seed = async () => {
  await sequelize.sync({ force: true }); // Clears tables and recreates

  const user1 = await User.create({ name: 'Alice', email: 'alice@example.com', password: '123456' });
  const user2 = await User.create({ name: 'Bob', email: 'bob@example.com', password: 'abcdef' });

  const post1 = await Post.create({ title: 'First Post', content: 'Hello GraphQL!', userId: user1?.id });
  const post2 = await Post.create({ title: 'Second Post', content: 'Sequelize + GraphQL is cool', userId: user2?.id });

  await Comment.create({ text: 'Nice post!', userId: user2?.id, postId: post1?.id });
  await Comment.create({ text: 'Thanks!', userId: user1?.id, postId: post1?.id });

  await Book.create({ title: 'Clean Code', author: 'Robert C. Martin' });
  await Book.create({ title: 'The Pragmatic Programmer', author: 'Andrew Hunt' });

  console.log('✅ Seed data created');
  process.exit();
};

seed();
