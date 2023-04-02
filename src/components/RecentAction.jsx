import React from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';
import { stringAvatar } from "../services/utils";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

const iconsByAction = {
  CREATE: <AddCircleIcon color="success"/>,
  UPDATE: <EditIcon color="primary"/>,
  DELETE: <DeleteIcon color="error"/>
}

function RecentAction({key, action}) {
  return (
    <ListItem
    key={key}
    disableGutters
    >
      <ListItemButton className="flex flex-row justify-center items-start">
      <ListItemAvatar>
          <Avatar {...stringAvatar(action.user.full_name)}/>
        </ListItemAvatar>
        <ListItemText primary={action.description} secondary={action.created_at} />
        {iconsByAction[action.type]}
      </ListItemButton>
        
      </ListItem>
  );
}

export default RecentAction;
