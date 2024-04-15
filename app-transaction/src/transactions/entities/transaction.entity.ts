import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { TransactionType } from './transaction-type.entity';
import { TransactionStatus } from './transaction-status.entity';

@Entity()
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field({ nullable: false })
  debit: string;

  @Column()
  @Field()
  credit: string;

  @ManyToOne(() => TransactionStatus)
  @JoinColumn()
  @Field(() => TransactionStatus)
  transactionStatus: TransactionStatus;

  @ManyToOne(() => TransactionType)
  @JoinColumn()
  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Column()
  @Field()
  value: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
