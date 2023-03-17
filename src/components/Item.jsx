import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from "@mui/material/IconButton";

function Item({ key, item, edit = false, onDelete=()=>{} }) {
  return (
    <ListItem
      key={key}
      disableGutters
      secondaryAction={
        edit ? (
          <IconButton onClick={() => onDelete(item)}>
            <DisabledByDefaultIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <></>
        )
      }
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText primary={item.name} secondary={item.consumers_names} />
        <p>R$ {item.price}</p>
      </ListItemButton>
    </ListItem>
  );
}

export default Item;
