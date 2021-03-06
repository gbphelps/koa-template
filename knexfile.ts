import path from 'path';

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

export default {
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'grant',
      database: 'koa_app_test'
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'grant',
      database: 'koa_app'
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
