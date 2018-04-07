export const REDIS_DB_ADDR: string = process.env.REDIS_DB_ADDR || "35.195.114.74";
export const REDIS_ENTRY_EXPIRY_SECONDS: number = process.env.REDIS_DB_ADDR ? parseInt(process.env.REDIS_DB_ADDR) : 60;
