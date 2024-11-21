import { z } from "zod";

export const imageSchema = z.object({
  aspectRatio: z.string(),
  color: z.string(),
  config: z.object({ restore: z.boolean() }),
  createdAt: z.string(),
  documentId: z.string(),
  height: z.number(),
  profile: z.object({
    createdAt: z.string(),
    creditBalances: z.number(),
    documentId: z.string(),
    firstname: z.string(),
  }),
  prompt: z.string(),
  publicId: z.string(),
  publishedAt: z.string(),
  secureURL: z.string(),
  title: z.string(),
  transformationType: z.string(),
  transformationUrl: z.string(),
  updatedAt: z.string(),
  width: z.number(),
});
export type ImageData = z.infer<typeof imageSchema>;
