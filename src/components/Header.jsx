import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Header = ({ logoutHandler }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // Use space-between to align title and button
            alignItems: "center", // Center items vertically
          }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Activity Tracker
          </Typography>
          <Button color="error" variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
