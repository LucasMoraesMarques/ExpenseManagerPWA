import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Person2Icon from "@mui/icons-material/Person2";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

function PaymentItem({ key }) {
  return (
    <ListItem key={key} disableGutters className="w-full p-0" disablePadding>
      <ListItemButton >
        <ListItemAvatar >
          <Avatar >
            <Person2Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Lucas" secondary="Dinheiro" sx={{ lineHeight: 1, margin: 0 }}/>
        <span>R$ 25,00</span>

      </ListItemButton>
      
      
    </ListItem>
  );
}

export default PaymentItem;
