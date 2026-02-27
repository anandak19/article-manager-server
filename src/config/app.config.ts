import * as Joi from 'joi';

export interface AppConfig {
  NODE_ENV: string;
  REDIS_URI: string;
  REDIS_PASS: string;
  REDIS_PORT: number;

  SMTP_HOST: string;
  SMTP_PASS: string;
  SMTP_PORT: number;
  SMTP_FROM: string;

  MONGO_URI: string;
}

export const appConfigSchema = Joi.object<AppConfig, true>({
  NODE_ENV: Joi.string().required(),
  REDIS_URI: Joi.string().required(),
  REDIS_PASS: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  SMTP_HOST: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_FROM: Joi.string().required(),

  MONGO_URI: Joi.string().required(),
});
