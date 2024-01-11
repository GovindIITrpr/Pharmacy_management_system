// database.js

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Pharmacy",
  password: "Gs12345@",
  port: 5432,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database!");
    return client;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export { pool, connectDB };
