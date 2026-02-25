import { Module } from '@nestjs/common';
import { createKeyv } from '@keyv/redis';
import { Cacheable } from 'cacheable';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';

@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: (configService: ConfigService<AppConfig>) => {
        const redisPass = configService.get<string>('REDIS_PASS', { infer: true })!;
        const redisPort = configService.get<number>('REDIS_PORT') as number;

        const redisUri = `redis://default:${redisPass}@redis:${redisPort}`;

        const secondary = createKeyv(redisUri);
        return new Cacheable({ secondary, ttl: '4h' });
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE', CacheService],
})
export class CacheModule {}
