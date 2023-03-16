import React, {useEffect, useState} from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from "@mui/icons-material/Person2";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Chip from "@mui/material/Chip";
import { Link, useNavigate, Location } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import CheckBox from "@mui/icons-material/CheckBox";

function ExpenseItem({ key, expense, edit=false, onCheck=()=>{} }) {
  const navigate = useNavigate();
  const [primaryText, setPrimaryText] = useState('')

  useEffect(() => {
    let text = `${expense.name} - ${expense.regarding_name}`
    if(edit){
      if(text.length > 23) {
        text = text.slice(0, 20) + '...'
    }}
    else{
      if(text.length > 30) {
        text = text.slice(0, 25) + '...'
    }
    }
    setPrimaryText(text)
  }, [edit])
  

  return edit ? (
    <ListItem
      key={key}
      disableGutters
    ><Checkbox onClick={onCheck}/>
      <ListItemButton className="flex flex-row justify-center items-start">
        <span className="absolute top-[35px] left-[100px]"></span>
        <ListItemText
          primary={primaryText}
          secondary={
            expense.date +
            (expense.is_validated ? " - Validada" : " - Em validação")
          }
        />
        <span>R$ {expense.cost}</span>
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem
      key={key}
      disableGutters
      onClick={() => navigate(`/despesa/${expense.id}`)}
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText
          primary={primaryText}
          secondary={
            expense.date +
            (expense.is_validated ? " - Validada" : " - Em validação")
          }
        />
        {/*<Chip label="Pago" color="success" />*/}
        <span>R$ {expense.cost}</span>
      </ListItemButton>
    </ListItem>
  );
}

export default ExpenseItem;
