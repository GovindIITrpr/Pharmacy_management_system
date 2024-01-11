import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
} from "@mui/material";

const SellDrugs = () => {
  const [formData, setFormData] = useState({
    customer_id: null,
    customer: "",
    company_name: "",
    drug_name: "",
    type: "",
    code: "",
    batch_no: "",
    selling_price: "",
    quantity: "",
    date: "",
    price: "",
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
          Sell Drug
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Customer Name", name: "customer", type: "text" },
              { label: "Company Name", name: "company_name", type: "text" },
              { label: "Drug Name", name: "drug_name", type: "text" },
              { label: "Type", name: "type", type: "text" },
              { label: "Code", name: "code", type: "text" },
              { label: "Batch No", name: "batch_no", type: "text" },
              { label: "Selling Price", name: "selling_price", type: "number" },
              { label: "Quantity", name: "quantity", type: "number" },
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
            Sell Drug
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SellDrugs;
