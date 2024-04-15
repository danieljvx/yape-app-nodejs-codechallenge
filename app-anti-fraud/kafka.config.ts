// kafka.config.ts
import { Kafka, logLevel } from 'kafkajs';
import { ClientEnum } from 'src/enums/client.enum';

const kafka = new Kafka({
  clientId: ClientEnum.ID,
  brokers: ['localhost:9092'],
  logLevel: logLevel.ERROR,
});

export const kafkaProducer = kafka.producer();

export const kafkaConsumer = kafka.consumer({ groupId: 'transactions' });
