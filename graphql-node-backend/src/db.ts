import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('graphql_learning_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
