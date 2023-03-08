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


function Member({ key, variant = "rounded", add = false}) {
  return variant == "rounded" ? (
    <ListItem key={key} disableGutters sx={{ width: "80px" }}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
          <span>Lucas</span>
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem key={key} disableGutters className="w-full">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Lucas" secondary="Jan 7, 2014" />

      </ListItemButton>
      { add ?
      <span className="rounded-[50%] bg-slate-300 align-middle">
      <IconButton >
        <AddIcon />
      </IconButton>
    </span> : <></>
      }
      
    </ListItem>
  );
}

export default Member;
