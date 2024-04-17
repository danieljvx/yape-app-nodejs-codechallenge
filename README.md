# Yape Code Challenge :rocket:

Our code challenge will let you marvel us with your Jedi coding skills :smile:. 

Don't forget that the proper way to submit your work is to fork the repo and create a PR :wink: ... have fun !!

- [Problem](#problem)
- [Tech Stack](#tech_stack)
- [Send us your challenge](#send_us_your_challenge)

# Problem

Every time a financial transaction is created it must be validated by our anti-fraud microservice and then the same service sends a message back to update the transaction status.
For now, we have only three transaction statuses:

<ol>
  <li>pending</li>
  <li>approved</li>
  <li>rejected</li>  
</ol>

Every transaction with a value greater than 1000 should be rejected.

```mermaid
  flowchart LR
    Transaction -- Save Transaction with pending Status --> transactionDatabase[(Database)]
    Transaction --Send transaction Created event--> Anti-Fraud
    Anti-Fraud -- Send transaction Status Approved event--> Transaction
    Anti-Fraud -- Send transaction Status Rejected event--> Transaction
    Transaction -- Update transaction Status event--> transactionDatabase[(Database)]
```

# Tech Stack

<ol>
  <li>Node. You can use any framework you want (i.e. Nestjs with an ORM like TypeOrm or Prisma) </li>
  <li>Any database</li>
  <li>Kafka</li>    
</ol>

We do provide a `Dockerfile` to help you get started with a dev environment.

You must have two resources:

1. Resource to create a transaction that must containt:

```json
{
  "accountExternalIdDebit": "Guid",
  "accountExternalIdCredit": "Guid",
  "tranferTypeId": 1,
  "value": 120
}
```

2. Resource to retrieve a transaction

```json
{
  "transactionExternalId": "Guid",
  "transactionType": {
    "name": ""
  },
  "transactionStatus": {
    "name": ""
  },
  "value": 120,
  "createdAt": "Date"
}
```

## Optional

You can use any approach to store transaction data but you should consider that we may deal with high volume scenarios where we have a huge amount of writes and reads for the same data at the same time. How would you tackle this requirement?

You can use Graphql;

# Send us your challenge

When you finish your challenge, after forking a repository, you **must** open a pull request to our repository. There are no limitations to the implementation, you can follow the programming paradigm, modularization, and style that you feel is the most appropriate solution.

If you have any questions, please let us know.


## Apps Files

Two apps's Nest.js `app-anti-fraud`, `app-transaction`

    .
    ├── ...
    ├── app-anti-fraud          # App Antifraud (Nest.js, Kafka Client) Validate transactions value
    ├── app-transaction         # App Transaction (Nest.js, Apollo Server, TypeORM, Kafka Client) Mutation save transactions and consumer for change status
    ├── sql
    │   ├── init.sql            # database structure
    │   ├── data.sql            # default data types and status
    ├── assets                  # image diagrams
    └── ...

## Apps Diagram

![](./assets/apps-diagram.jpeg)

## Data Base Diagram

![](./assets/db-diagram.png)

### `1 - Up Docker Containers postgres, zookeeper, kafka:`

```bash
# (postgres, zookeeper, kafka)
$ docker-compose up
```

### `2 - Import database:`
```bash
docker-compose exec -T postgres psql -U postgres -d postgres < ./app-transaction/sql/data.sql
```

### `3 - Up App app-transaction`

```bash
# into foler ./app-transaction
$ cd app-transaction

# copy .env.example file to .env
$ cp .env.example .env

# install dependency
$ yarn install

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### `4 - Up App app-anti-fraud`


```bash
# into foler ./app-anti-fraud
$ cd app-anti-fraud

# copy .env.example file to .env
$ cp .env.example .env

# install dependency
$ yarn install

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### `Local Apps:`
| Resource            | Url                                                                                        |
|---------------------|--------------------------------------------------------------------------------------------|
| app-transaction     | [http://localhost:3000](http://localhost:3000)                                             |
| Playground Graphql  | [http://localhost:3000/graphql](http://localhost:3000/graphql)                             |
| app-anti-fraud      | [http://localhost:4000](http://localhost:4000)                                             |

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