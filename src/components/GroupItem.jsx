import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { stringAvatar } from "../services/utils";

function GroupItem({ key, variant = "rounded", group }) {
  return (
    <Link to={`/grupo/${group.id}`}>
      {variant == "rounded" ? (
        <ListItem key={key} disableGutters sx={{padding:0, width:'100px'}}>
          <ListItemButton>
            <div className="flex flex-col justify-center items-center">
              <Avatar {...stringAvatar(group.name)} size={10} />
              <span className="align-middle text-center">
                {group.name.length > 10
                  ? group.name.slice(0, 10) + "..."
                  : group.name}
              </span>
            </div>
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem key={key} disableGutters className="w-full" sx={{padding:0}}>
          <ListItemButton>
            <ListItemText primary={group.name} secondary={group.description.length > 40
                  ? group.description.slice(0, 40) + "..."
                  : group.description} />
            <div className="flex flex-col text-sm">
              <span>Criado em</span>
              <span>{group.created_at}</span>
            </div>
          </ListItemButton>
        </ListItem>
      )}
    </Link>
  );
}
export default GroupItem;
