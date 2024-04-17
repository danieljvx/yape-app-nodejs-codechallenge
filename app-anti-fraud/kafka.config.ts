import { Kafka, logLevel } from 'kafkajs';
import { ClientEnum } from 'src/enums/client.enum';

const kafka = new Kafka({
  clientId: ClientEnum.ID,
  brokers: [
    `${process.env.KAFKA_HOST || 'localhost'}:${
      process.env.KAFKA_PORT || 9092
    }`,
  ],
  logLevel: logLevel.ERROR,
});

export const kafkaProducer = kafka.producer();

export const kafkaConsumer = kafka.consumer({ groupId: 'transactions' });
