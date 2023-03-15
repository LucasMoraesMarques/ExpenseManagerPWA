import React from "react";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from '@mui/icons-material/Person2';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Chip from '@mui/material/Chip';
import { Link, useNavigate, Location } from "react-router-dom";

function ExpenseItem({key, expense}) {
  const navigate = useNavigate();

  return (
    <ListItem
    key={key}
    disableGutters
    onClick={() => navigate(`/despesa/${expense.id}`)}
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <span className="absolute top-[35px] left-[100px]">
</span>
        <ListItemText primary={`${expense.name} - ${expense.regarding_name}`} secondary={expense.date +  (expense.is_validated ? ' - Validada' : ' - Em validação')} />
        {/*<Chip label="Pago" color="success" />*/}
        <span>R$ {expense.cost}</span>
        

      </ListItemButton>
        
      </ListItem>
  );
}

export default ExpenseItem;
