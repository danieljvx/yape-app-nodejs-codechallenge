import { Injectable } from '@nestjs/common';
import { kafkaConsumer, kafkaProducer } from 'kafka.config';
import { Producer } from 'kafkajs';
import { TopicsEnum } from 'src/enums/topics.enum';
import { ValueEnum } from 'src/enums/value.enum';
import { TransactionTopicCreated } from './dto/transaction-topic-created.dto';
import { TransactionTopicStatus } from './dto/transaction-topic-status.dto';

@Injectable()
export class AntiFraudService {
  kafka: Producer;
  constructor() {
    this.initializeTransactionCreatedConsumer();
  }

  private async validate(transaction: TransactionTopicCreated): Promise<void> {
    const transactionTopicStatus: TransactionTopicStatus = {
      id: transaction.id,
      status: transaction.value <= ValueEnum.MAX_LIMIT ? 2 : 3,
    };
    await this.sendTransactionStatusEvent(transactionTopicStatus);
  }

  private async sendTransactionStatusEvent(
    transaction: TransactionTopicStatus,
  ): Promise<void> {
    console.log('AntiFraud - Send message transaction-status:');
    console.log(transaction);
    await kafkaProducer.connect();
    await kafkaProducer.send({
      topic: TopicsEnum.TRANSACTION_STATUS,
      messages: [
        {
          value: JSON.stringify(transaction),
        },
      ],
    });
    await kafkaProducer.disconnect();
  }

  private async initializeTransactionCreatedConsumer(): Promise<void> {
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({
      topic: TopicsEnum.TRANSACTION_CREATED,
      fromBeginning: true,
    });
    await kafkaConsumer.run({
      eachMessage: async ({ message }) => {
        const ourBuffer = Buffer.from(message.value);
        const t = ourBuffer.toString('utf8');
        console.log('AntiFraud - Received message transaction-created:');
        console.log(t);
        const transaction: TransactionTopicCreated = JSON.parse(
          t as unknown as string,
        ) as TransactionTopicCreated;
        await this.validate(transaction);
      },
    });
  }
}
