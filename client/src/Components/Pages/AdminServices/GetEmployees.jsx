import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/admin/getAllEmployees"
        );
        const data = await response.json();
        console.log(data);
        setEmployees(data); // Assuming the API response is an array of employee objects
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Employee List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Valid Upto</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.valid_upto}</TableCell>
                <TableCell>{employee.dob}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetEmployees;
