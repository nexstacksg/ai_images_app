"use client";

import { Toaster } from "@/components/ui/toaster";
import ApolloProvider from "@/lib/apolloProvider";
import { Theme } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProvider>
      <Theme>{children}</Theme>
      <Toaster />
    </ApolloProvider>
  );
}
