import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `${process.env.LOCAL_SQL_DB}`,
});
