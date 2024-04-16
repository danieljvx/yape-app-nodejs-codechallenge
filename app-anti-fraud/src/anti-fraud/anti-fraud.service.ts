import { Injectable } from '@nestjs/common';
import { kafkaConsumer, kafkaProducer } from 'kafka.config';
import { Producer } from 'kafkajs';
import { TransactionDto } from './dto/transaction.dto';
import { TopicsEnum } from 'src/enums/topics.enum';
import { ValueEnum } from 'src/enums/value.enum';

@Injectable()
export class AntiFraudService {
  kafka: Producer;
  constructor() {
    this.initializeTransactionCreatedConsumer();
  }

  private async validate(transaction: TransactionDto): Promise<void> {
    transaction.transactionStatus.id =
      transaction.value <= ValueEnum.MAX_LIMIT ? 2 : 3;
    await this.sendTransactionStatusEvent(transaction);
  }

  private async sendTransactionStatusEvent(
    transaction: TransactionDto,
  ): Promise<void> {
    console.log(
      `Send message transaction-status:\n${JSON.stringify(transaction)}`,
    );
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
        console.log('Received Created Transaction:\n');
        console.log(t);
        const transaction: TransactionDto = JSON.parse(
          t as unknown as string,
        ) as TransactionDto;
        await this.validate(transaction);
      },
    });
  }
}
