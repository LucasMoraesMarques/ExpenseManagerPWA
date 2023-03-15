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

function RegardingItem({key, regarding}) {
  const navigate = useNavigate();

  return (
    <ListItem
    key={key}
    disableGutters
    onClick={() => navigate(`/referencia/${regarding.id}`)}
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText primary={`${regarding.name} - ${regarding.group_name}`} secondary={`${regarding.start_date} - ${regarding.end_date}`} />
        {regarding.is_closed ? <LockOutlinedIcon sx={{ color: 'red' }}/> : <LockOpenOutlinedIcon color="success"/>}
      </ListItemButton>
        
      </ListItem>
  );
}

export default RegardingItem;
