import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
ssl: { rejectUnauthorized: false }
    });

    console.log("✅ Connected!");
    const [rows] = await conn.query("SELECT NOW() AS time");
    console.log(rows);
    conn.end();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
