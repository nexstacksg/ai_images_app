"use client";

import { useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

export default function CustomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <Image
        src="/assets/images/logo-text.svg"
        alt="logo"
        width={260}
        height={54}
      />
      <div className="text-sm">
        {error.message ??
          "This page is under construction. Please come back later."}{" "}
      </div>

      <button
        className="rounded bg-primary text-white py-2 px-4"
        onClick={reset}
      >
        Back to Dashboard
      </button>
    </Flex>
  );
}
