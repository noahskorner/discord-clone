/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production';
      APP_NAME?: string;
      HOST?: string;
      PORT?: string;
      DATABASE_URL?: string;
      DATABASE?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      ACCESS_TOKEN_SECRET?: string;
      REFRESH_TOKEN_SECRET?: string;
      VERIFY_EMAIL_SECRET?: string;
      RESET_PASSWORD_SECRET?: string;
      ACCESS_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_EXPIRATION: string;
      VERIFY_EMAIL_EXPIRATION: string;
      RESET_PASSWORD_EXPIRATION: string;
      SMTP_HOST?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
    }
  }
}

export {};
