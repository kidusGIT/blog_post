import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// my sql connect
// const mySqlSequelize = new Sequelize(
//   "blog_post",
//   "username",
//   "password", {
//     host: "localhost",
//     dialect: "mysql"
//   }
// )

export default sequelize;
