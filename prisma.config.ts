import { defineConfig } from "prisma/config";
export default defineConfig({
  schema: "./prisma/schema.prisma",
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!, // O '!' resolve o erro de 'undefined'
  },
});