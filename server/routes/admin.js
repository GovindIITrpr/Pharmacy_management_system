import express from "express";
import {
  addDrug,
  addEmployee,
  addNewAdmin,
  getAllDrugs,
  getAllEmployees,
  loginAdmin,
  logoutAdmin,
  getAllSoldDrugs,
} from "../controllers/admin.js";
import { isAuthAdmin } from "../middlewares/isAuth.js";

const router = express.Router();

// actions for admin
router.route("/loginAdmin").get(loginAdmin);
router.route("/logoutAdmin").get(logoutAdmin);
router.route("/newadmin").post(addNewAdmin);
router.route("/newemployee").post(addEmployee);
router.route("/newdrug").post(addDrug);
router.route("/getAllEmployees").get(getAllEmployees);
router.route("/getAlldrugs").get(getAllDrugs);
router.route("/getAllSoldDrugs").get(getAllSoldDrugs);

export default router;
