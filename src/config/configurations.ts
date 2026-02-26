import { appConfigSchema } from './app.config';

export default () => {
  const config = {
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URI: process.env.REDIS_URI,
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_PORT: process.env.REDIS_PORT,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_FROM: process.env.SMTP_FROM,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { error, value } = appConfigSchema.validate(config, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    console.log(error);
    throw new Error(`Config Validation Error: ${error.message}`);
  }

  return value;
};
