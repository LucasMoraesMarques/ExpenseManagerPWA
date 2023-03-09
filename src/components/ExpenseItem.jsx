import React from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Chip from '@mui/material/Chip';
import { Link, useNavigate, Location } from "react-router-dom";


function ExpenseItem({key}) {
  const navigate = useNavigate();

  return (
    <ListItem
    key={key}
    disableGutters
    onClick={() => navigate("/despesa/5")}
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText primary="Work - Ref 1" secondary="R$ 25,50" />
        <Chip label="Pago" color="success" />

      </ListItemButton>
        
      </ListItem>
  );
}

export default ExpenseItem;
