import React from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';


function RecentAction({key}) {
  return (
    <ListItem
    key={key}
    disableGutters
    >
      <ListItemButton className="flex flex-row justify-center items-start">
      <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
        <p>gfd</p>
      </ListItemButton>
        
      </ListItem>
  );
}

export default RecentAction;
