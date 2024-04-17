import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Producer } from 'kafkajs';
import { KafkaProucerService } from '../kafka/kafka-producer.service';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';
import { TopicsEnum } from 'src/enums/topics.enum';
import { TransactionTopicStatus } from './dto/transaction-topic-status.dto';
import { TransactionTopicCreated } from './dto/transaction-topic-created.dto';

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
    const transactionTopicCreated: TransactionTopicCreated = {
      id: transactionResponse.id,
      accountExternalIdDebit: transactionResponse.debit,
      accountExternalIdCredit: transactionResponse.credit,
      tranferTypeId: transactionResponse.transactionType.id,
      value: transactionResponse.value,
    };
    await this.sendTransactionCreatedEvent(transactionTopicCreated);
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
    transactionTopicStatus: TransactionTopicStatus,
  ): Promise<void> {
    await this.transactionsRepository.update(
      { id: transactionTopicStatus.id },
      {
        transactionStatus: { id: transactionTopicStatus.status },
      },
    );
  }

  private async sendTransactionCreatedEvent(
    transaction: TransactionTopicCreated,
  ): Promise<void> {
    console.log('Transaction - Send message transaction-created:');
    console.log(transaction);
    await this.kafkaProucerService.produce({
      topic: TopicsEnum.TRANSACTION_CREATED,
      messages: [
        {
          value: JSON.stringify(transaction),
        },
      ],
    });
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
          console.log('Transaction - Received message transaction-status:');
          console.log(t);
          const transactionTopicStatus: TransactionTopicStatus = JSON.parse(
            t,
          ) as TransactionTopicStatus;
          this.updateTransactionStatus(transactionTopicStatus);
        },
      },
    );
  }
}
