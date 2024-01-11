import React, { useState } from "react";
import { Container, Grid, Button, Paper } from "@mui/material";
import AddAdminForm from "./AdminServices/AddAdminForm";
import AddDrugsForm from "./AdminServices/AddDrugsForm";
import AddEmployeeForm from "./AdminServices/AddEmployeeForm";
import GetDrugs from "./AdminServices/GetDrugs";
import GetEmployees from "./AdminServices/GetEmployees";
import GetSoldDrugs from "./AdminServices/GetSoldDrugs";

const AdminActionPage = () => {
  const [selectedAction, setSelectedAction] = useState("getDrugs");

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <Container
      style={{ height: "100vh", marginLeft: "-10px", marginRight: "10px" }}
    >
      <Grid container style={{ height: "100%", marginRight: "10px" }}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "20px", height: "100%" }}>
            <h3 style={{ margin: "15px", width: "300px", maxWidth: "70%" }}>
              Admin Actions
            </h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("getDrugs")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Get Drugs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("getEmployees")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Get Employees
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("getSoldDrugs")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Get Sold Drugs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("addAdmin")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Add Admin
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("addDrugs")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Add Drugs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("addEmployee")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Add Employee
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: "20px", height: "100%" }}>
            {selectedAction === "addAdmin" && <AddAdminForm />}
            {selectedAction === "addDrugs" && <AddDrugsForm />}
            {selectedAction === "addEmployee" && <AddEmployeeForm />}
            {selectedAction === "getDrugs" && <GetDrugs />}
            {selectedAction === "getEmployees" && <GetEmployees />}
            {selectedAction === "getSoldDrugs" && <GetSoldDrugs />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminActionPage;
