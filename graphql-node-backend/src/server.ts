import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import sequelize from './db';
import { typeDefs, resolvers } from './schema';

const startServer = async () => {
  try {
    const app: Application = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Connect to DB
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models (alter for dev mode only)
    await sequelize.sync({ alter: true });

    // Start HTTP server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

startServer();
