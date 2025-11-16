import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Use process.env with fallback for prisma generate (which doesn't need actual DB connection)
// For migrations and database operations, DATABASE_URL should be set in .env file
const databaseUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/gbur_website";

// Set DATABASE_URL in process.env so schema.prisma can access it via env("DATABASE_URL")
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
