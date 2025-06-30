import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Global()
@Module({
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule implements OnModuleInit {
  private readonly logger = new Logger(RedisModule.name);

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    try {
      const isAlive = await this.redisService.ping();
      if (isAlive) {
        this.logger.log('✅ Redis successfully connected');
      } else {
        this.logger.error('❌ Redis connection failed');
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
}
