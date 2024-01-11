import express from "express";
import {
  sellDrug,
  getAllDrugs,
  loginEmployee,
  logoutEmployee,
  makeReceipt,
} from "../controllers/employee.js";
import { isAuthEmployee } from "../middlewares/isAuth.js";

const router = express.Router();

// actions for employee
router.route("/loginEmployee").get(loginEmployee);
router.route("/logoutEmployee").get(logoutEmployee);
router.route("/sell").post(sellDrug);
router.route("/receipt").get(makeReceipt);
router.route("/getAlldrugs").get(getAllDrugs);

export default router;
