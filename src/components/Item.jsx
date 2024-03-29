import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import IconButton from "@mui/material/IconButton";

function Item({ key, item, edit = false, onDelete = () => {}, onClick = () => {} }) {
  return (
    <ListItem
      key={key}
      disableGutters
      disablePadding
      secondaryAction={
        edit ? (
          <IconButton onClick={() => onDelete(item)}>
            <DisabledByDefaultIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          false
        )
      }
      className="px-0 w-screen"
    >
      <ListItemButton className="flex flex-row justify-center items-start" onClick={edit ? onClick : null}>
        <ListItemText primary={item.name} secondary={item.consumers_names} sx={{width:'70%'}}/>
        <p>R$ {item.price}</p>
      </ListItemButton>
    </ListItem>
  );
}

export default Item;
