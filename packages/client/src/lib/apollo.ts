import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { urlResolver } from "./UrlResolver";

const httpLink = new HttpLink({
  uri: urlResolver.graphql(),
  credentials: "include", // without this => logged out when refresh
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  // wsLink,
  httpLink
);

export const client = new ApolloClient({
  // link: splitLink,uri: urlResolver.graphql(),
  uri: urlResolver.graphql(),
  credentials: "include",
  cache: new InMemoryCache({ addTypename: false }),
});
