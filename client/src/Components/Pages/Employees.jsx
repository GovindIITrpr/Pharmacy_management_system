import React, { useState } from "react";
import { Container, Grid, Button, Paper } from "@mui/material";
import GetAllDrugs from "./EmployeeServices/GetAllDrugs";
import MakeRecipt from "./EmployeeServices/MakeRecipt";
import SellDrugs from "./EmployeeServices/SellDrugs";

const Employee = () => {
  const [selectedAction, setSelectedAction] = useState("getAllDrugs");

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <Container
      style={{ height: "100vh", marginLeft: "-10px", marginRight: "10px" }}
    >
      <Grid container style={{ height: "100%", marginRight: "0px" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "20px", height: "100%" }}>
            <h3 style={{ margin: "15px", width: "300px", maxWidth: "70%" }}>
              Employee Actions
            </h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("getAllDrugs")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Get all drugs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("sellDrugs")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Sell Drugs
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleActionClick("makeReceipt")}
              style={{ marginBottom: "10px", width: "300px", maxWidth: "70%" }}
            >
              Make receipt
            </Button>
          </Paper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: "20px" }}>
            {/* Use conditional rendering based on the selected action */}
            {selectedAction === "getAllDrugs" && <GetAllDrugs />}
            {selectedAction === "sellDrugs" && <SellDrugs />}
            {selectedAction === "makeReceipt" && <MakeRecipt />}
            {/* Render other components based on the selected action */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Employee;
