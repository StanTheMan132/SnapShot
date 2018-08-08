const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: process.env.DEV_PORT || 3000,
  },
  jwt: {
    secret: process.env.DEV_JWT_SECRET || 'SuperSecret',
    expires: process.env.DEV_JWT_EXPIRES || '1h',
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'snapshot_auth',
  },
};


const test = {
  app: {
    port: process.env.TEST_PORT || 3000,
  },
  Jwt: {
    secret: process.env.TEST_JWT_SECRET || 'SuperSecret',
    expires: process.env.TEST_JWT_EXPIRES || '1h',
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 27017,
    name: process.env.TEST_DB_NAME || 'test_snapshot_auth',
  },
};


const prod = {
  app: {
    port: process.env.PROD_PORT,
  },
  Jwt: {
    secret: process.env.PROD_JWT_SECRET,
    expires: process.env.PROD_JWT_EXPIRES,
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_NAME,
  },
};

const config = {
  dev,
  test,
  prod,
};

module.exports = config[env];
