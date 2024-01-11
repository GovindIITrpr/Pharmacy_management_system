import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
} from "@mui/material";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    valid_upto: "",
    dob: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call
    console.log("Adding employee:", formData);
    setTimeout(() => {
      // Update UI or state after API response
      console.log("Employee added successfully.");
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" gutterBottom>
          Add New Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Name", name: "name" },
              { label: "Email", name: "email", type: "email" },
              { label: "Valid Upto", name: "valid_upto", type: "text" },
              { label: "DOB", name: "dob", type: "text" },
              { label: "Address", name: "address" },
              { label: "Phone", name: "phone" },
              { label: "Password", name: "password", type: "password" },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Add Employee
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEmployeeForm;
