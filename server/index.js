require('dotenv').config({ path: "./config/.env" });
const express = require('express');
const mongoose = require('mongoose');
const graphql= require('graphql');
const { graphqlHTTP } = require('express-graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const RootQuery = require('./graphql/schema/index');
const RootMutation = require('./graphql/mutation/index');
const app = express();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB database connection established successfully!"))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(
    '/graphql',
    graphqlHTTP({
        schema: new GraphQLSchema({query: RootQuery, mutation:RootMutation}),
        graphiql: true,
    }),
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));