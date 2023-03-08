import React from 'react'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Person2Icon from '@mui/icons-material/Person2';


function Member({key}) {
  return (
    <ListItem
    key={key}
    disableGutters
    sx={{width: '80px'}}
    >
      <ListItemButton >
      <ListItemAvatar>
          <Avatar>
            <Person2Icon/>
          </Avatar>
          <span>Lucas</span>
        </ListItemAvatar>
      </ListItemButton>
        
      </ListItem>
  )
}

export default Member