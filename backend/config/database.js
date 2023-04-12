// module.exports = {
//   development: {
//     storage: process.env.DB_FILE, // location of DB file
//     dialect: "sqlite", // specify RDBMS
//     seederStorage: "sequelize",
//     benchmark: true, // prints execution time to terminal
//     logQueryParameters: true, // prints parameters with logged SQL
//     typeValidation: true, // model-level data type validation
//     // logging: false // print SQL to terminal unless set to false
//   },
// };
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};