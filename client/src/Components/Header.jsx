import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useUser } from "./Context/UserContext";

const Header = () => {
  const { userName } = useUser();
  console.log(userName);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center", // Center horizontally
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center vertically
            }}
          >
            <span style={{ fontSize: "24px" }}>Pharmacy Management System</span>
          </Link>
          <Typography>{userName}</Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
