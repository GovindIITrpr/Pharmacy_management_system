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

const GetSoldDrugs = () => {
  const [drugsData, setDrugsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/admin/getAllSoldDrugs"
        );
        if (response.ok) {
          const data = await response.json();
          setDrugsData(data);
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Drugs Information
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Drug Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Batch No</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date of selling</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Employeee (Sold By)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugsData.map((drug, index) => (
              <TableRow key={index}>
                <TableCell>{drug.customer_id}</TableCell>
                <TableCell>{drug.customer}</TableCell>
                <TableCell>{drug.company_name}</TableCell>
                <TableCell>{drug.drug_name}</TableCell>
                <TableCell>{drug.type}</TableCell>
                <TableCell>{drug.code}</TableCell>
                <TableCell>{drug.batch_no}</TableCell>
                <TableCell>{drug.selling_price}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>
                  {new Date(drug.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{drug.price}</TableCell>
                <TableCell>{drug.employee_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetSoldDrugs;
