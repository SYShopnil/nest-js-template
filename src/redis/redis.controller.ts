import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Redis Connection')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @ApiOperation({ summary: 'Test cache server connection' })
  @ApiResponse({ status: 200, description: 'Returns a boolean  value.' })
  @Get('test')
  async testRedisConnection() {
    return this.redisService.ping();
  }
}
