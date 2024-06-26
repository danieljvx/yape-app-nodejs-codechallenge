import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { ClientEnum } from 'src/enums/client.enum';

@Injectable()
export class KafkaProucerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka = new Kafka({
    clientId: ClientEnum.ID,
    brokers: [
      `${process.env.KAFKA_HOST || 'localhost'}:${
        process.env.KAFKA_PORT || 9092
      }`,
    ],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
