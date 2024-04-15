import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => [Transaction])
  async transactions() {
    return await this.transactionsService.findAll();
  }

  @Mutation(() => Transaction)
  async create(
    @Args('value') value: number,
    @Args('tranferTypeId') tranferTypeId: number,
    @Args('accountExternalIdDebit') accountExternalIdDebit: string,
    @Args('accountExternalIdCredit') accountExternalIdCredit: string,
  ) {
    return await this.transactionsService.create(
      value,
      tranferTypeId,
      accountExternalIdDebit,
      accountExternalIdCredit,
    );
  }
}
