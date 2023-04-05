import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function DashItem({ title, value, helpText = null }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      className="rounded-xl p-0 flex flex-row items-center h-[60px] "
      variant="outlined"
    >
      <div className="w-full bg-slate-200">
        <p className="text-center font-bold">
          {title}
          {helpText ? (
            <HelpOutlineOutlinedIcon
              onClick={handleClick}
              sx={{ fontSize: "18px", marginLeft: "3px" }}
            />
          ) : (
            <></>
          )}
        </p>
        <p className="text-center">{value}</p>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <p className="text-center">{helpText}</p>
      </Popover>
    </Paper>
  );
}

export default DashItem;
