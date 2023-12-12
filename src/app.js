// src/app.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schemas/financeSchema');
const rootValue = require('./graphql/resolvers/financeResolvers');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

module.exports = app;
