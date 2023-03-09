import React from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate, Location } from "react-router-dom";

function RegardingItem({key}) {
  const navigate = useNavigate();

  return (
    <ListItem
    key={key}
    disableGutters
    onClick={() => navigate("/referencia/5")}
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText primary="Work - Group 1" secondary="Jan 7, 2014 - Jan 25, 2014" />
        <LockOutlinedIcon/>
      </ListItemButton>
        
      </ListItem>
  );
}

export default RegardingItem;
