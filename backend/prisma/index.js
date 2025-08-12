import { PrismaClient } from "@prisma/client";
import logger from "../src/utils/logger.js";

const prisma = new PrismaClient({
  log: [
    { level: "query", emit: "event" },
    { level: "warn", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

prisma.$on("query", (e) => {
  logger.info(`[Prisma:Query] ${e.query} (${e.duration}ms)`);
});

// prisma.$on("warn", (e) => {
//   logger.warn(`[Prisma:Warn] ${e.message}`);
// });

// prisma.$on("error", (e) => {
//   logger.error(`[Prisma:Error] ${e.message}`);
// });

export default prisma;
