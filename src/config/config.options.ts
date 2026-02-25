import { ConfigModuleOptions } from '@nestjs/config';
import configurations from './configurations';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configurations],
  envFilePath: ['.env'],
};
