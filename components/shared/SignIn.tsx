"use client";
import { Box, Flex } from "@radix-ui/themes";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema, TokenData } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutation/auth";
import apolloClient from "@/lib/apolloClient";
import { setToken } from "@/utils/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { toast } from "../ui/use-toast";
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [loginAction] = useMutation(LOGIN, {
    client: apolloClient,
    onCompleted: async (response: TokenData) => {
      setToken(response?.login?.jwt);
      toast({
        title: "Successfully Login",
        description: "Welcome to Imaginify",
        duration: 5000,
        className: "success-toast",
      });
      await getUserById(response?.login?.user.email, response?.login?.jwt);
      router.replace("/home");
    },
    onError: (error) => {
      toast({
        title: "Failed",
        description: error?.message ?? "Invalid Credential",
        duration: 5000,
        className: "error-toast",
      });
      console.log("error", error);
    },
  });

  const submit = async (data: LoginForm) => {
    await loginAction({
      variables: { input: data },
    });
  };

  return (
    <Flex>
      <Card>
        <CardContent>
          <Flex
            direction="column"
            align="center"
            justify="center"
            className="p-4 pt-8 w-[420px] space-y-4"
          >
            <Box className="text-center pt-4">
              <Image
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={260}
                height={54}
              />
              <div className="text-[20px] font-semibold pt-4">Welcome Back</div>
              <div className="text-[16px] ">Please log in to continue</div>
            </Box>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submit)}
                className="w-full flex flex-col space-y-6"
              >
                <Flex direction="column" gap="4" className="w-full">
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className=""
                            placeholder="Enter your email"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className=""
                            placeholder="Enter your password"
                            type="password"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Flex>

                <Button size="lg">Log in</Button>
              </form>
            </Form>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  );
};

export default SignIn;
