import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton({callback=null}) {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => callback != null ? callback() : window.history.back()}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
