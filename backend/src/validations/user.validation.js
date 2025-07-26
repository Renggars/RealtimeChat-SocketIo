import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  profilePic: z.string().url().optional(),
});
