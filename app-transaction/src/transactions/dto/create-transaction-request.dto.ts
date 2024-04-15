import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Int, { description: 'Transaction Value' })
  value: number;

  @Field(() => Int, { description: 'Transaction Type Id' })
  tranferTypeId: number;

  @Field(() => String, { description: 'Transaction Account External Debit' })
  accountExternalIdDebit: string;

  @Field(() => String, { description: 'Transaction Account External Credit' })
  accountExternalIdCredit: string;
}
