import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string().optional(),
  image: z.string().url().optional(),
  receiverId: z.string().uuid().optional(),
});
