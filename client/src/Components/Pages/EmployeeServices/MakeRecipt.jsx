import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
} from "@mui/material";

const MakeRecipt = () => {
  const [formData, setFormData] = useState({
    customer: "",
    date: "",
    employee_id: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call
    console.log("Adding drug:", formData);
    setTimeout(() => {
      // Update UI or state after API response
      console.log("Drug added successfully.");
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" gutterBottom>
          Add New Drug
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Customer Name", name: "customer", type: "text" },
              { label: "Date", name: "date", type: "text" },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: "10px" }}
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
            Make Recipt
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default MakeRecipt;
