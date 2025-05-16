import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Cors from 'micro-cors';

import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default Cors()((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  return startServer.then(() => {
    apolloServer.createHandler({ path: '/api/graphql' })(req, res);
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};
