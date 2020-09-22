require("dotenv").config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
<<<<<<< HEAD
    url: process.env.DATABASE_URL,
=======
    url: process.env.DATABASE_URL_DEV,
>>>>>>> 2a378dc2b7d0ea637d032ba35f15a49da5d3d5a3
    dialect: "postgres",
    operatorsAliases: "0",
  },
};
