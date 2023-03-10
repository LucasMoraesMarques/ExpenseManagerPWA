import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Person2Icon from "@mui/icons-material/Person2";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";


function GroupItem({ key}) {
  return (
    <ListItem key={key} disableGutters sx={{ width: "80px" }}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
          <span>Grupo 1</span>
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  )
  }
export default GroupItem;
