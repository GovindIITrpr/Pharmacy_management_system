import { pool } from "../database/database.js";
import { connectDB } from "../database/database.js";
import ErrorHandler from "../middlewares/error.js";
import { setCookies } from "../utils/features.js";

export const loginEmployee = async (req, res, next) => {
  const { employee_id, password } = req.query;

  try {
    const client = await connectDB(); // Use await here

    const result = await client.query(
      "SELECT * FROM employee WHERE employee_id = $1",
      [employee_id]
    );

    if (result.rows.length === 0) {
      return next(new ErrorHandler("Invalid Employee ID or password", 401));
    }

    const storedPassword = result.rows[0].password;

    if (storedPassword != password) {
      return next(new ErrorHandler("Invalid Employee ID or password", 401));
    }

    setCookies(employee_id, res, `Welcome Back ${result.rows[0].name}`, 200);

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

export const sellDrug = async (req, res) => {
  const {
    customer,
    company_name,
    drug_name,
    type,
    code,
    batch_no,
    selling_price,
    quantity,
    date,
    price,
  } = req.body;
  const employee = employee; // do correct this
  try {
    const client = await connectDB();

    const existingDrug = await client.query(
      "SELECT * FROM drug WHERE company_name = $1 AND code = $2 AND batch_no = $3",
      [company_name, code, batch_no]
    );

    if (existingDrug.rows.length > 0) {
      return next(
        new ErrorHandler("Drug with the provided details already exists", 409)
      );
    }
    const result = await client.query(
      "INSERT INTO drug(customer, company_name, drug_name, type, code, batch_no, selling_price, quantity, date, price, employee) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        customer,
        company_name,
        drug_name,
        type,
        code,
        batch_no,
        selling_price,
        quantity,
        date,
        price,
        employee,
      ]
    );

    res.status(201).json({
      success: true,
      message: "New drug added successfully",
      drug: result.rows[0],
    });

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};

export const logoutEmployee = (req, res) => {
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
// fix the logic
export const makeReceipt = async (req, res) => {
  const { customer, date } = req.query;
  const employee_id = 1; // do correct this
  console.log(customer, date, employee_id);
  try {
    const client = await connectDB();

    const result = await client.query(
      "SELECT * FROM sales_buffer WHERE customer = $1 AND date = $2 AND employee_id = $3",
      [customer, date, employee_id]
    );

    // const result = await client.query(
    //   "INSERT INTO drug(customer, company_name, drug_name, type, code, batch_no, selling_price, quantity, date, price, employee) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
    //   [
    //     customer,
    //     company_name,
    //     drug_name,
    //     type,
    //     code,
    //     batch_no,
    //     selling_price,
    //     quantity,
    //     date,
    //     price,
    //     employee,
    //   ]
    // );

    res.status(201).json({
      success: true,
      message: "New drug added successfully",
      drug: result.rows,
    });

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
};
