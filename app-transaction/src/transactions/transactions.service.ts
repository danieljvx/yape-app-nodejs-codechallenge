import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
// import { kafkaConsumer, kafkaProducer } from 'kafka.config';
import { Producer } from 'kafkajs';
import { KafkaProucerService } from '../kafka/kafka-producer.service';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';
import { TopicsEnum } from 'src/enums/topics.enum';

@Injectable()
export class TransactionsService {
  kafka: Producer;
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly kafkaProucerService: KafkaProucerService,
    private readonly kafkaConsumerService: KafkaConsumerService,
  ) {
    this.initializeTransactionStatusConsumer();
  }

  async create(
    value: number,
    tranferTypeId: number,
    accountExternalIdDebit: string,
    accountExternalIdCredit: string,
  ) {
    const tCreate = this.transactionsRepository.create({
      debit: accountExternalIdDebit,
      credit: accountExternalIdCredit,
      transactionStatus: {
        id: 1,
      },
      transactionType: {
        id: tranferTypeId,
      },
      value,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const transaction = await this.transactionsRepository.save(tCreate);
    const transactionResponse = await this.findOneById(transaction.id);
    await this.sendTransactionCreatedEvent(transactionResponse);
    return transactionResponse;
  }

  async findOneById(id: number): Promise<Transaction> {
    return this.transactionsRepository.findOne({
      where: {
        id,
      },
      relations: {
        transactionType: true,
        transactionStatus: true,
      },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find({
      relations: {
        transactionType: true,
        transactionStatus: true,
      },
    });
  }

  private async updateTransactionStatus(
    id: number,
    statusId: number,
  ): Promise<void> {
    await this.transactionsRepository.update(
      { id },
      {
        transactionStatus: { id: statusId },
      },
    );
  }

  private async sendTransactionCreatedEvent(
    transaction: Transaction,
  ): Promise<void> {
    console.log(
      `Send message transaction-created:\n${JSON.stringify(transaction)}`,
    );
    // await this.kafkaProucerService.produce.connect();
    await this.kafkaProucerService.produce({
      topic: TopicsEnum.TRANSACTION_CREATED,
      messages: [
        {
          value: JSON.stringify(transaction),
        },
      ],
    });
    // await kafkaProducer.disconnect();
  }

  private async initializeTransactionStatusConsumer(): Promise<void> {
    await this.kafkaConsumerService.consume(
      {
        topics: [TopicsEnum.TRANSACTION_STATUS],
        fromBeginning: true,
      },
      {
        eachMessage: async ({ message }) => {
          const ourBuffer = Buffer.from(message.value);
          const t = ourBuffer.toString('utf8');
          console.log('Received Status Transaction:\n');
          console.log(t);
          const transaction = JSON.parse(t);
          this.updateTransactionStatus(
            transaction.id,
            transaction.transactionStatus.id,
          );
        },
      },
    );
  }
}
