import { Module } from '@nestjs/common';
import { AntiFraudService } from './anti-fraud.service';

@Module({
  providers: [AntiFraudService],
})
export class AntiFraudModule {}
