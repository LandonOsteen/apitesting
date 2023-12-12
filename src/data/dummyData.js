// src/data/dummyData.js

const users = [
  {
    id: '1', 
    name: 'John Doe',
    profile: {
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        country: 'Countryland'
      }
    },
    accounts: ['1', '2'] // Referencing account IDs
  },
  {
    id: '2', 
    name: 'Jane Smith',
    profile: {
      age: 28,
      address: {
        street: '456 Side St',
        city: 'Othertown',
        country: 'Islandia'
      }
    },
    accounts: ['3', '4'] // Referencing account IDs
  },
];
  
const accounts = [
  {
    id: '1', 
    balance: 1000.00, 
    currency: 'USD', 
    userId: '1',
    transactions: ['1', '2'] // Referencing transaction IDs
  },
  {
    id: '2', 
    balance: 2000.00, 
    currency: 'EUR', 
    userId: '1',
    transactions: ['3'] // Referencing transaction IDs
  },
];
  
const transactions = [
  {
    id: '1', 
    amount: 100.00, 
    date: '2023-01-01', 
    type: 'deposit', 
    accountId: '1',
    details: {
      location: 'ATM 123',
      method: 'Cash'
    }
  },
  {
    id: '2', 
    amount: -150.00, 
    date: '2023-01-02', 
    type: 'withdrawal', 
    accountId: '1',
    details: {
      location: 'ATM 456',
      method: 'Card'
    }
  },
];
  
module.exports = {
  users,
  accounts,
  transactions,
};
  