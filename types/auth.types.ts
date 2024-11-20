import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const tokenSchema = z.object({
  login: z.object({
    jwt: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});
export type TokenData = z.infer<typeof tokenSchema>;

export const meSchema = z.object({
  documentId: z.string(),
  email: z.string(),
  username: z.string(),
  profile: z.object({
    documentId: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    creditBalances: z.number(),
  }),
});
export type MeData = z.infer<typeof meSchema>;
