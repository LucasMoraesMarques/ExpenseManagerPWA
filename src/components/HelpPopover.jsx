import React from "react";
import Popover from "@mui/material/Popover";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function HelpPopover({helpText}) {
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
    <span>
      <HelpOutlineOutlinedIcon
        onClick={handleClick}
        sx={{ fontSize: "18px", marginLeft: "3px" }}
      />
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
    </span>
  );
}

export default HelpPopover;
