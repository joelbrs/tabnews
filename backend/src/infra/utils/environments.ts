import { z } from "zod";
import "dotenv/config";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  PORT: z.number().default(8080),
  DATABASE_URL: z.string(),
});

const _env = environmentSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environent configs: ", _env.error.format());
  throw Error("Inavlid environment config.");
}

export const env = _env.data;
