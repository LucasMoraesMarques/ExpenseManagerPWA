import React from 'react'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';

function NotificationItem({key}) {
  return (
    <ListItem
    key={key}
    disableGutters
    >
      <ListItemButton className="flex flex-row justify-center items-start">
      
        <ListItemText primary="Work" secondary="Lucas, Baiano" />
        <p>R$ 2,50</p>
      </ListItemButton>
        
      </ListItem>
  )
}

export default NotificationItem