import fs from "node:fs"
import path from "node:path"
import { config as loadEnv } from "dotenv"
import { defineConfig, env } from "prisma/config"

const isTestEnv =
  process.env.NODE_ENV === "test" ||
  process.env.VITEST === "true" ||
  process.env.VITEST === "1"

const envFile = isTestEnv ? ".env.test" : ".env"
const envPath = path.resolve(process.cwd(), envFile)

if (fs.existsSync(envPath)) {
  loadEnv({ path: envPath, override: true })
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For Neon with connection pooling, use DATABASE_URL (pooled) for app
    // and DATABASE_URL_UNPOOLED (non-pooled) for migrations
    url: env("DATABASE_URL_UNPOOLED") || env("DATABASE_URL"),
  },
})
