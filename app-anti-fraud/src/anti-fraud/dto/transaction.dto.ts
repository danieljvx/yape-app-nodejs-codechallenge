import { TransactionStatusDto } from './transaction-status.dto';
import { TransactionTypeDto } from './transaction-type.dto';

export class TransactionDto {
  id: number;

  debit: string;

  credit: string;

  transactionStatus: TransactionStatusDto;

  transactionType: TransactionTypeDto;

  value: number;

  createdAt: Date;

  updatedAt: Date;
}
