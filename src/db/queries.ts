import { pool } from "./pool";
import codeGenerator from "@/lib/codeGenerator";

import { SurveyData, User } from "@/db/dataTypes";

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
  length,
  other,
  beverage,
  name,
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
      `INSERT INTO guest_data (guest_id, date, length, beverage, diet, other, name)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
      [rows[0].id, date, length, beverage, diet, other, name]
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

export async function getSurveys(param: string) {
  try {
    const { rows } = await pool.query(
      `SELECT a.code, b.name AS name, b.date AS date, b.length AS length, b.beverage, b.diet, b.other
        FROM guest AS a 
        JOIN guest_data AS b ON a.id = b.guest_id
        ORDER BY ${param}
      `
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
}
