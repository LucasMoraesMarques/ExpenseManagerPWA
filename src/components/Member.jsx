import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { stringAvatar } from "../services/utils";
import Tooltip from "@mui/material/Tooltip";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const membershipLevels = {
  Administrador: {
    icon: <ManageAccountsIcon sx={{ fontSize: 30 }} />,
    tooltip: "Administrador",
  },
  Editor: { icon: <EditIcon sx={{ fontSize: 30 }} />, tooltip: "Editor" },
  Leitor: { icon: <AccountBoxIcon sx={{ fontSize: 30 }} />, tooltip: "Leitor" },
};

function Member({ key, member, variant = "rounded" }) {
  if (member) {
    let fullName = member.first_name + " " + member.last_name;
    return variant == "rounded" ? (
      <ListItem key={key} disableGutters disablePadding sx={{ width: "80px" }}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar {...stringAvatar(fullName)} />
            <span>{fullName}</span>
          </ListItemAvatar>
        </ListItemButton>
      </ListItem>
    ) : (
      <ListItem key={key} disableGutters disablePadding className="w-full">
        <div className="flex justify-between items-center w-full p-2">
          <ListItemAvatar>
            <Avatar {...stringAvatar(fullName)} />
          </ListItemAvatar>
          <ListItemText
            primary={fullName}
            secondary={"Desde " + member.joined_at}
          />

          <Tooltip title={membershipLevels[member.level].tooltip}>
            <IconButton>{membershipLevels[member.level].icon}</IconButton>
          </Tooltip>
        </div>
      </ListItem>
    );
  } else {
    return <></>;
  }
}

export default Member;
