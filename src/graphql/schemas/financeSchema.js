// src/graphql/schemas/financeSchema.js
const { buildSchema } = require('graphql');

// Construct a schema using GraphQL's schema language
const schema = buildSchema(`
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getAccounts: [Account]
    getAccount(id: ID!): Account
    getTransactions: [Transaction]
    getTransaction(id: ID!): Transaction
  }

  type User {
    id: ID!
    name: String
    accounts: [Account]
  }

  type Account {
    id: ID!
    balance: Float
    currency: String
    user: User
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    amount: Float
    date: String
    type: String
    account: Account
  }
`);

module.exports = schema;
