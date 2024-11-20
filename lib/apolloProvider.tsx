"use client";

import React, { PropsWithChildren } from "react";

import apolloClient from "@/lib/apolloClient";
import { ApolloProvider as GraphQlApolloProvider } from "@apollo/client";

const ApolloProvider = ({ children }: PropsWithChildren) => {
  return (
    <GraphQlApolloProvider client={apolloClient}>
      {children}
    </GraphQlApolloProvider>
  );
};

export default ApolloProvider;
