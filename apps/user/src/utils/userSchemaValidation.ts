import { z } from "zod";

export const userSchemaValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+\d+$/)
    .min(7)
    .max(15),
});

export const userUpdateSchemaValidation = userSchemaValidation.pick({
  firstName: true,
  lastName: true,
  phone: true,
});
