import { GraphQLClient } from "graphql-request";
import awsConfig from "../aws-exports";

const gqlClient = new GraphQLClient(awsConfig.aws_appsync_graphqlEndpoint, {
  headers: { "x-api-key": awsConfig.aws_appsync_apiKey },
});

export default gqlClient;
