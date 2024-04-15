import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AntiFraudModule } from './anti-fraud/anti-fraud.module';

@Module({
  imports: [AntiFraudModule],
  controllers: [AppController],
})
export class AppModule {}
