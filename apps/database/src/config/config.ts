import "dotenv/config";
import { z } from "zod";

const ConfigSchema = z.object({
  database: z.string().min(1),
});

export const Config = ConfigSchema.parse({
  database: process.env.DATABASE_URL,
});
