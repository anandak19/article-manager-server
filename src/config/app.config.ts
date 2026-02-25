import * as Joi from 'joi';

export interface AppConfig {
  NODE_ENV: string;
  REDIS_URI: string;
  REDIS_PASS: string;
  REDIS_PORT: number;
}

export const appConfigSchema = Joi.object<AppConfig, true>({
  NODE_ENV: Joi.string().required(),
  REDIS_URI: Joi.string().required(),
  REDIS_PASS: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});
