// Components/Footer.js
import React from "react";
import { Typography, Paper, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Paper
      elevation={3}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#2196F3", // Blue color
        color: "white", // Text color
        padding: "10px",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">Built by Govind Shakya</Typography>
      <div>
        <Link
          href="https://www.linkedin.com/in/govind-shakya-56344a205/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <LinkedInIcon style={{ marginRight: 10 }} />
        </Link>
        <Link href="mailto:shakyagovind230@gmail.com" color="inherit">
          <EmailIcon style={{ marginRight: 10 }} />
        </Link>
        <Link href="tel:+917415832134" color="inherit">
          <PhoneIcon />
        </Link>
      </div>
    </Paper>
  );
};

export default Footer;
