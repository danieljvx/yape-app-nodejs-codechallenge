## `app-transaction`

### `Up App`

```bash
# copy .env.example file to .env
$ cp .env.example .env

# install dependency
$ yarn install

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### `Local App:`
| Resource            | Url                                                                                        |
|---------------------|--------------------------------------------------------------------------------------------|
| app-transaction     | [http://localhost:3000](http://localhost:3000)                                             |
| Playground Graphql  | [http://localhost:3000/graphql](http://localhost:3000/graphql)                             |


### `Mutation create transactions:` [http://localhost:3000/graphql](http://localhost:3000/graphql)
```graphql
mutation {
  create(value: 300, tranferTypeId: 1, accountExternalIdDebit: "Guid", accountExternalIdCredit: "Guid") {
    id
    debit
    transactionType {
      name
    }
    transactionStatus {
      name
    }
    value
    createdAt
  }
}
```

### `Query transactions:` [http://localhost:3000/graphql](http://localhost:3000/graphql)
```graphql
query {
  transactions {
    debit
    transactionType {
      name
    }
    transactionStatus {
      name
    }
    value
    createdAt
  }
}
```

## Daniel Villanueva

- Email: [villanueva.danielx@gmail.com](mail://villanueva.danielx@gmail.com)

- Github: [@danieljvx](https://github.com/danieljvx)

- Linkedin - [Daniel Villanueva](https://www.linkedin.com/in/danieljx)