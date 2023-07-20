// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "TMDT",
// });

// export default pool;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('metatest', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;