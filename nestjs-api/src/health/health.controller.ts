import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator
} from '@nestjs/terminus';
import * as os from 'os';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private dns: DNSHealthIndicator
  ) {
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () => this.disk.checkStorage('storage', {
        thresholdPercent: 0.9,
        path: os.platform().startsWith('win') ?
          'C:\\' :
          '/'
      }),
      () => this.dns.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
    ]);
  }
}