if (process.env.APP_NAME == null)
  throw new Error('APP_NAME environment variable missing.');
if (process.env.HOST == null)
  throw new Error('HOST environment variable missing.');
if (process.env.PORT == null)
  throw new Error('PORT environment variable missing.');
if (process.env.DATABASE_URL == null)
  throw new Error('DATABASE_URL environment variable missing.');
if (process.env.DATABASE == null)
  throw new Error('DATABASE environment variable missing.');
if (process.env.DB_USER == null)
  throw new Error('DB_USER environment variable missing.');
if (process.env.DB_PASSWORD == null)
  throw new Error('DB_PASSWORD environment variable missing.');
if (process.env.DB_PORT == null)
  throw new Error('DB_PORT environment variable missing.');
if (process.env.ACCESS_TOKEN_SECRET == null)
  throw new Error('ACCESS_TOKEN_SECRET environment variable missing.');
if (process.env.REFRESH_TOKEN_SECRET == null)
  throw new Error('REFRESH_TOKEN_SECRET environment variable missing.');
if (process.env.VERIFY_EMAIL_SECRET == null)
  throw new Error('VERIFY_EMAIL_SECRET environment variable missing.');
if (process.env.RESET_PASSWORD_SECRET == null)
  throw new Error('RESET_PASSWORD_SECRET environment variable missing.');
if (process.env.ACCESS_TOKEN_EXPIRATION == null)
  throw new Error('ACCESS_TOKEN_EXPIRATION environment variable missing.');
if (process.env.REFRESH_TOKEN_EXPIRATION == null)
  throw new Error('REFRESH_TOKEN_EXPIRATION environment variable missing.');
if (process.env.VERIFY_EMAIL_EXPIRATION == null)
  throw new Error('VERIFY_EMAIL_EXPIRATION environment variable missing.');
if (process.env.RESET_PASSWORD_EXPIRATION == null)
  throw new Error('RESET_PASSWORD_EXPIRATION environment variable missing.');
if (process.env.SMTP_HOST == null)
  throw new Error('SMTP_HOST environment variable missing.');
if (process.env.SMTP_USER == null)
  throw new Error('SMTP_USER environment variable missing.');
if (process.env.SMTP_PASSWORD == null)
  throw new Error('SMTP_PASSWORD environment variable missing.');

const env = {
  APP_NAME: process.env.APP_NAME,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE: process.env.DATABASE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  VERIFY_EMAIL_SECRET: process.env.VERIFY_EMAIL_SECRET,
  RESET_PASSWORD_SECRET: process.env.RESET_PASSWORD_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  VERIFY_EMAIL_EXPIRATION: process.env.VERIFY_EMAIL_EXPIRATION,
  RESET_PASSWORD_EXPIRATION: process.env.RESET_PASSWORD_EXPIRATION,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

export default env;
