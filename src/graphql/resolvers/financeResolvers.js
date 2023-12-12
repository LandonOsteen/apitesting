// src/graphql/resolvers/financeResolvers.js
const { users, accounts, transactions } = require('../../data/dummyData');

const financeResolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUser: ({ id }) => {
      return users.find(user => user.id === id);
    },
    getAccounts: () => {
      return accounts;
    },
    getAccount: ({ id }) => {
      return accounts.find(account => account.id === id);
    },
    getTransactions: () => {
      return transactions;
    },
    getTransaction: ({ id }) => {
      return transactions.find(transaction => transaction.id === id);
    }
  },
  User: {
    accounts: (user) => {
      return accounts.filter(account => account.userId === user.id);
    }
  },
  Account: {
    user: (account) => {
      return users.find(user => user.id === account.userId);
    },
    transactions: (account) => {
      return transactions.filter(transaction => transaction.accountId === account.id);
    }
  },
  Transaction: {
    account: (transaction) => {
      return accounts.find(account => account.id === transaction.accountId);
    }
  }
};

module.exports = financeResolvers;
