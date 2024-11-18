import { pool } from "./pool";
import codeGenerator from "@/lib/codeGenerator";

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
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows;
}

export async function getCodes() {
  const { rows } = await pool.query(`SELECT * FROM guest`);

  return rows;
}

export async function createNewCode() {
  const code = codeGenerator(5);
  const rows = await getCodes();

  console.log(rows, code);

  try {
    await pool.query(
      `INSERT INTO guest (code, assigned)
        VALUES ($1, false)`,
      [code]
    );
  } catch (err) {
    console.log(err);
  }
}
