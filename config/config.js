require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/lms_dev',
    dialect: 'postgres',
    logging: false
  },
  
  test: {
    url: process.env.TEST_DATABASE_URL || 'postgres://user:password@localhost:5432/lms_test',
    dialect: 'postgres',
    logging: false
  },
  
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};


