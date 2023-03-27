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
import { Link } from "react-router-dom";
import { stringAvatar } from "../services/utils";


function GroupItem({ key, variant = "rounded", group}) {
    return (<Link to={`/grupo/${group.id}`}>
    {variant == "rounded" ? (
      <ListItem key={key} disableGutters sx={{ width: "125px" }}>
        <ListItemButton>
          <div className="flex flex-col justify-center items-center">
          <Avatar {...stringAvatar(group.name)} size={10}/>
            <span className="">{group.name.length >= 10 ? group.name.slice(0, 7) + '...': group.name}</span>
          </div>
            
        </ListItemButton>
      </ListItem>
    ) : (
      <ListItem key={key} disableGutters className="w-full">
        <ListItemButton>
          <ListItemText primary={group.name} secondary={group.description} />
          <div className="flex flex-col text-sm">
          <span>Criado em</span>
        <span>{group.created_at}</span>
        </div>
        </ListItemButton>
        
      </ListItem>
    )}
    </Link>)
    
  }
export default GroupItem;
