import { pool } from "./pool";
import codeGenerator from "@/lib/codeGenerator";
import dateToday from "@/lib/dateToday";

import { SurveyData, User, DashboardMetrics } from "@/db/dataTypes";

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

export async function updateUsername(id: string, nw: string) {
  try {
    console.log(nw, id);
    await pool.query(
      `
      UPDATE users
      SET username = $1
      WHERE id = $2
      `,
      [nw, id]
    );
  } catch (err) {
    console.log(err);
  }
}

export async function updatePassword(id: string, password: string) {
  try {
    await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      `,
      [password, id]
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

export async function getUserbyId(id: string) {
  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

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

export async function getAllSurveys(
  param = "date"
): Promise<SurveyData[] | undefined> {
  try {
    const { rows } = await pool.query(
      `SELECT a.code, b.name AS name, b.date AS date, b.length AS length, b.beverage, b.diet, b.other
        FROM guest AS a 
        JOIN guest_data AS b ON a.id = b.guest_id
        ORDER BY ${param}
      `
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpcomingSurveys(
  param = "date"
): Promise<SurveyData[] | undefined> {
  try {
    const today = dateToday();

    const { rows } = await pool.query(
      `SELECT a.code, b.name AS name, b.date AS date, b.length AS length, b.beverage, b.diet, b.other
        FROM guest AS a 
        JOIN guest_data AS b ON a.id = b.guest_id
        WHERE date > $1
        ORDER BY ${param}
      `,
      [today]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getPastSurveys(
  param = "date"
): Promise<SurveyData[] | undefined> {
  try {
    const today = dateToday();

    const { rows } = await pool.query(
      `SELECT a.code, b.name AS name, b.date AS date, b.length AS length, b.beverage, b.diet, b.other
        FROM guest AS a 
        JOIN guest_data AS b ON a.id = b.guest_id
        WHERE date < $1
        ORDER BY ${param}
      `,
      [today]
    );

    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getSurvey(code: string): Promise<SurveyData | undefined> {
  try {
    const { rows } = await pool.query(
      `SELECT a.code, b.name AS name, b.date AS date, b.length AS length, b.beverage, b.diet, b.other
        FROM guest AS a 
        JOIN guest_data AS b ON a.id = b.guest_id
        WHERE a.code = $1
    `,
      [code]
    );
    console.log(rows[0]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

export async function deleteSurvey(code: string) {
  try {
    await pool.query(
      `DELETE FROM guest
        WHERE code = $1
        `,
      [code]
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getDashboardMetrics(): Promise<
  DashboardMetrics | undefined
> {
  try {
    const today = dateToday();

    const surveysTotalCount = await pool.query(
      `
      SELECT COUNT(*) FROM guest_data WHERE date > $1 
      `,
      [today]
    );
    const surveys30Count = await pool.query(
      `
      SELECT COUNT(*) FROM guest_data WHERE date > $1 AND date < $1 + 30
      `,
      [today]
    );
    const currentSurveys = await pool.query(
      `
      SELECT a.code, b.name, b.date, b.length
      FROM guest AS a JOIN guest_data AS b ON a.id = b.guest_id
      WHERE $1 >= b.date AND $1 < b.date + b.length
      `,
      [today]
    );
    const nextSurvey = await pool.query(
      `
      SELECT a.code, b.name, b.date
      FROM guest AS a JOIN guest_data AS b ON a.id = b.guest_id
      WHERE b.date > $1
      ORDER BY b.date LIMIT 1
      `,
      [today]
    );
    const upcomingSurveys = await pool.query(
      `
      SELECT a.code, b.name, b.date, b.length
      FROM guest AS a JOIN guest_data AS b ON a.id = b.guest_id
      WHERE b.date > $1
      ORDER BY b.date
      LIMIT 3
      `,
      [today]
    );

    const beverageCount = await pool.query(
      `
      SELECT SUM(CASE WHEN beverage = 'Coffee' THEN 1 ELSE 0 END) AS coffee,
      SUM(CASE WHEN beverage = 'Tea' THEN 1 ELSE 0 END) AS tea
      FROM guest_data
      `
    );

    return {
      surveysTotal: surveysTotalCount.rows[0].count,
      surveys30: surveys30Count.rows[0].count,
      currentSurveys: currentSurveys.rows,
      nextSurvey: nextSurvey.rows[0],
      upcomingSurveys: upcomingSurveys.rows,
      beveragePref:
        beverageCount.rows[0].coffee < beverageCount.rows[0].tea
          ? "Tea"
          : "Coffee",
    };
  } catch (err) {
    console.log(err);
  }
}
