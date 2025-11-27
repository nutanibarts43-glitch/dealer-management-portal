import * as z from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  description: z.string().optional(),
  price: z.string().optional(),
  visible: z.boolean().default(true),
});

export type ServiceFormType = z.infer<typeof serviceSchema>;
