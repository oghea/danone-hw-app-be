const dotenv = require('dotenv');

process.env.ENV = process.env.ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Our server config
   */
  server: {
    host: process.env[`APP_SERVER_HOST`],
    port: process.env[`APP_SERVER_PORT`],
  },

  isProduction: process.env[`ENV`] === `production`,

  timezone: process.env[`APP_TIMEZONE`],

  baseUri: process.env[`BASE_URL`],

  database: {
    'development': {
      'username': 'root',
      'password': null,
      'database': 'database_development',
      'host': '127.0.0.1',
      'dialect': 'postgres'
    },
    'test': {
      'username': 'root',
      'password': null,
      'database': 'database_test',
      'host': '127.0.0.1',
      'dialect': 'postgres'
    },
    'production': {
      'username': 'root',
      'password': null,
      'database': 'database_production',
      'host': '127.0.0.1',
      'dialect': 'postgres'
    }
  }
};