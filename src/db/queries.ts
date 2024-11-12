import { pool } from "./pool";

type User = {
  username: string;
  password: string;
  email?: string | null;
  phone?: number | null;
};

export async function createUser({
  username,
  password,
  email = null,
  phone = null,
}: User) {
  await pool.query(
    `INSERT INTO users (username, password, email, phone)
            VALUES ($1, $2, $3, $4)
        `,
    [username, password, email, phone]
  );
}

export async function getUser(username: string) {
  const { rows } = await pool.query(`SELECT * from users WHERE username = $1`, [
    username,
  ]);
  return rows;
}
