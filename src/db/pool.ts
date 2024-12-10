import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `${process.env.NODE_ENV === "development" ? process.env.LOCAL_SQL_DB : process.env.PRODUCTION_DB}`,
});
