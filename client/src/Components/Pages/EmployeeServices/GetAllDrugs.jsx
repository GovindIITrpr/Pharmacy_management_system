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

const GetAllDrugs = () => {
  const [drugsData, setDrugsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/employee/getAllDrugs"
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
              <TableCell>Company Name</TableCell>
              <TableCell>Drug Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Batch No</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugsData.map((drug, index) => (
              <TableRow key={index}>
                <TableCell>{drug.company_name}</TableCell>
                <TableCell>{drug.drug_name}</TableCell>
                <TableCell>{drug.type}</TableCell>
                <TableCell>{drug.code}</TableCell>
                <TableCell>{drug.batch_no}</TableCell>
                <TableCell>{drug.selling_price}</TableCell>
                <TableCell>
                  {new Date(drug.expiry).toLocaleDateString()}
                </TableCell>
                <TableCell>{drug.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetAllDrugs;
