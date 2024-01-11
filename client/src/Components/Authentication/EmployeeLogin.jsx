import React, { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://localhost:5000/api/v1/employee/loginEmployee?employee_id=${formData.id}&password=${formData.password}`;

    try {
      const response = await fetch(apiUrl);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.success) {
          navigate("/employee");
        } else {
          console.error("Login failed:", data.message);
        }
      } else {
        console.error(
          "Non-JSON response received:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <div
        style={{
          border: "2px solid #2196F3",
          borderRadius: "5px",
          marginTop: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Employee Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <TextField
            label="Employee ID"
            variant="outlined"
            fullWidth
            margin="normal"
            name="id"
            value={formData.id}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "300px" }} // Adjust width and margin
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "10px", width: "300px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "200px", marginTop: "10px", marginBottom: "30px" }} // Adjust width and margin
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AdminLogin;
