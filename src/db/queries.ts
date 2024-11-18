import { pool } from "./pool";
import codeGenerator from "@/lib/codeGenerator";

type User = {
  username: string;
  password: string;
  email?: string | null;
  phone?: number | null;
};

type SurveyData = {
  number: string;
  code: string;
  date: string;
  beverage: string;
  diet: string;
  other: string;
};

export async function createUser({
  username,
  password,
  email = null,
  phone = null,
}: User) {
  try {
    await pool.query(
      `INSERT INTO users (username, password, email, phone)
              VALUES ($1, $2, $3, $4)
          `,
      [username, password, email, phone]
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(username: string) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getCodes() {
  try {
    const { rows } = await pool.query(`SELECT * FROM guest`);

    return rows;
  } catch (err) {
    console.log(err);
  }
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

export async function createSurvey({
  code,
  date,
  diet,
  number,
  other,
  beverage,
}: SurveyData) {
  try {
    const { rows } = await pool.query(
      `SELECT id FROM guest WHERE code = $1 AND assigned = false
      `,
      [code]
    );

    if (rows.length === 0) {
      return [];
    }

    await pool.query(
      `INSERT INTO guest_data (guest_id, arrival_date, stay_length, beverage, diet, other)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
      [rows[0].id, date, number, beverage, diet, other]
    );

    await pool.query(
      `UPDATE guest
        SET assigned = true
        WHERE id = $1
      `,
      [rows[0].id]
    );
  } catch (err) {
    console.log(err);
  }
}
