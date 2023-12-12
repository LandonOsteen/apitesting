// src/index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schemas/financeSchema');
const rootValue = require('./graphql/resolvers/financeResolvers');

const app = express();

// Configure the GraphQL endpoint with express-graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true, // GraphiQL is a graphical interactive in-browser GraphQL IDE
}));

// Start the server on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
