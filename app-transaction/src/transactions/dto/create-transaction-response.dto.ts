import { InputType, Int, Field } from '@nestjs/graphql';

interface ITransactionTypeStatus {
  name: string;
}

@InputType()
export class CreateTransactionResponse {
  @Field(() => String, { description: 'Transaction External Id' })
  transactionExternalId: string;

  @Field(() => Int, { description: 'Transaction Value' })
  value: number;

  @Field(() => Date, { description: 'Transaction Date Created' })
  createdAt: Date;

  @Field(() => Object, { description: 'Transaction Type Name' })
  transactionType: ITransactionTypeStatus;

  @Field(() => Object, { description: 'Transaction status Name' })
  transactionStatus: ITransactionTypeStatus;
}
