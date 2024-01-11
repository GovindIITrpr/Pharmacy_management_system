import jwt from "jsonwebtoken";
import { pool } from "../database/database.js";

export const isAuthAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM admin WHERE id = $1", [
      decoded.id,
    ]);
    req.user = result.rows[0];
    client.release();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying the token",
    });
  }
};

export const isAuthEmployee = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM employee WHERE employee_id = $1",
      [decoded.employee_id]
    );
    req.user = result.rows[0];
    client.release();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying the token",
    });
  }
};
