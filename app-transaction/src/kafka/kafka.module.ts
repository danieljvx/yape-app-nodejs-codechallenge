import { Module } from '@nestjs/common';
import { KafkaProucerService } from './kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  providers: [KafkaProucerService, KafkaConsumerService],
  exports: [KafkaProucerService, KafkaConsumerService],
})
export class KafkaModule {}
