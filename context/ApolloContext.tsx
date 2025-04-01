import React, { createContext, useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const ApolloContext = createContext<ApolloClient<any> | null>(null);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL endpoin
  cache: new InMemoryCache(),
});

export const ApolloContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApolloClient = () => {
  const context = useContext(ApolloContext);
  if (!context) {
    throw new Error(
      "useApolloClient must be used within an ApolloContextProvider"
    );
  }
  return context;
};
