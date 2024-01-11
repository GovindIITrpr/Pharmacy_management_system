import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import AdminLogin from "./AdminLogin";
import EmployeeLogin from "./EmployeeLogin";

function Authentication() {
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <Container maxWidth="sm">
      <div className="authentication-container">
        <div
          className="authentication-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            style={{ margin: "20px", fontWeight: "bold" }}
          >
            Authentication
          </Typography>
          <div className="authentication-buttons">
            <Button
              onClick={() => handleRoleChange("admin")}
              variant="contained"
              color="primary"
            >
              Admin
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => handleRoleChange("employee")}
              variant="contained"
              color="primary"
            >
              Employee
            </Button>
          </div>
        </div>
        <div className="page-content" style={{ marginTop: "20px" }}>
          {selectedRole === "admin" ? <AdminLogin /> : <EmployeeLogin />}
        </div>
      </div>
    </Container>
  );
}

export default Authentication;
