import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";

const AddAdminForm = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "id" ? parseInt(value, 10) : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, password } = formData;

    try {
      await axios.post("http://localhost:5000/api/v1/admin/newadmin", {
        id,
        name,
        password,
      });
      console.log("Admin added successfully.");
      setFormData({ id: "", name: "", password: "" });
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h5"
        style={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Add Admin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="id"
          type="number" // Set the type to "number" for numeric input
          value={formData.id}
          onChange={handleInputChange}
        />
        <TextField
          label="name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="text"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add Admin
        </Button>
      </form>
    </Container>
  );
};

export default AddAdminForm;
