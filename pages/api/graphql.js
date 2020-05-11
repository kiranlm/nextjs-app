import { ApolloServer, gql } from 'apollo-server-micro';
import knex from 'knex';
import Bookshelf from 'bookshelf';
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve('pages/db/sqlite.db'),
  },
});

const bookshelf = Bookshelf(db);

const Todo = bookshelf.model('Todo', {
  tableName: 'todo',
});

const typeDefs = gql`
  type Query {
    todos: [Todo!]!
  }
  type Todo {
    id: Int!
    title: String
    completed: Boolean
  }
  type Mutation {
    addTodo(id: Int, title: String!): Todo
  }
`;

const resolvers = {
  Query: {
    async todos(parent, args, context) {
      return await [new Todo().fetch()];
    },
  },
  Mutation: {
    addTodo: async (root, args) => {
      const newTodo = { id: args.id, title: args.title };
      return await new Todo().save(newTodo);
      // return newTodo;
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: '/api/graphql' });
