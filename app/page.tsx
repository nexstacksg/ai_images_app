"use client";
import { cn } from "@/lib/utils";
import { getToken } from "@/utils/auth";
import { Flex } from "@radix-ui/themes";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

const SplashPage = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      const token = getToken();
      if (token) {
        startTransition(() => router.replace("/home"));
      } else {
        startTransition(() => router.replace("/sign-in"));
      }
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return (
    <Flex
      direction="column"
      className="h-screen"
      justify="center"
      align="center"
    >
      <Image
        src="/assets/images/logo-text.svg"
        alt="logo"
        width={260}
        height={54}
      />
      <Flex
        justify="center"
        align="center"
        className={cn("animate-spin text-base font-bold mt-2", "text-primary")}
      >
        <Loader className="w-6 h-6" />
      </Flex>
    </Flex>
  );
};
export default SplashPage;
