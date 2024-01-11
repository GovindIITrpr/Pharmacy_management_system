import { pool } from "../database/database.js";
import { connectDB } from "../database/database.js";
import ErrorHandler from "../middlewares/error.js";
import { setCookies } from "../utils/features.js";

export const loginAdmin = async (req, res, next) => {
  const { id, password } = req.query;
  const { token } = req.cookies;
  try {
    const client = await connectDB();

    const result = await client.query("SELECT * FROM admin WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return next(new ErrorHandler("invalid admin Id or Password", 401));
    }
    const storedPassword = result.rows[0].password;

    if (storedPassword != password) {
      return next(new ErrorHandler("invalid admin Id or Password", 401));
    }

    setCookies(id, res, `Welcome Back ${result.rows[0].name}`, 200);

    client.release();
  } catch (err) {
    next(err);
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM employee");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const getAllDrugs = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM drug");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const getAllSoldDrugs = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM sales");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const addNewAdmin = async (req, res, next) => {
  const { id, name, password } = req.body;

  try {
    const client = await connectDB();
    const existingAdmin = await client.query(
      "SELECT * FROM admin WHERE id = $1",
      [id]
    );

    if (existingAdmin.rows.length > 0) {
      return next(
        new ErrorHandler("Admin with the provided ID already exists", 409)
      );
    }
    const result = await client.query(
      "INSERT INTO admin(id, name, password) VALUES($1,$2, $3) RETURNING *",
      [id, name, password]
    );

    res.status(201).json({
      success: true,
      message: "New admin added successfully",
      admin: result.rows[0],
    });

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const addEmployee = async (req, res, next) => {
  const {
    employee_id,
    name,
    email,
    valid_upto,
    dob,
    address,
    phone,
    password,
  } = req.body;

  try {
    const client = await connectDB();

    // Check if an employee with the same employee_id already exists
    const existingEmployee = await client.query(
      "SELECT * FROM employee WHERE employee_id = $1",
      [employee_id]
    );

    if (existingEmployee.rows.length > 0) {
      // Employee with the same employee_id already exists
      return next(
        new ErrorHandler("Employee with the provided ID already exists", 409)
      );
    }
    const result = await client.query(
      "INSERT INTO employee(employee_id, name, email, valid_upto, dob, address, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [employee_id, name, email, valid_upto, dob, address, phone, password]
    );

    res.status(201).json({
      success: true,
      message: "New employee added successfully",
      employee: result.rows[0],
    });

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const addDrug = async (req, res, next) => {
  const {
    company_name,
    drug_name,
    type,
    code,
    batch_no,
    selling_price,
    expiry,
    quantity,
  } = req.body;

  try {
    const client = await connectDB();

    const existingDrug = await client.query(
      "SELECT * FROM drug WHERE company_name = $1 AND code = $2 AND batch_no = $3",
      [company_name, code, batch_no]
    );

    if (existingDrug.rows.length > 0) {
      return next(
        new ErrorHandler("Drug with the provided ID already exists", 409)
      );
    } else {
      const result = await client.query(
        "INSERT INTO drug(company_name, drug_name, type, code, batch_no, selling_price, expiry, quantity) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          company_name,
          drug_name,
          type,
          code,
          batch_no,
          selling_price,
          expiry,
          quantity,
        ]
      );

      res.status(201).json({
        success: true,
        message: "New drug added successfully",
        drug: result.rows[0],
      });
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const logoutAdmin = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      // sameSite: process.env.NODE_END === "Development" ? "lax" : "none",
      // secure: process.env.NODE_END === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
