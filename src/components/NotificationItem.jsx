import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import classNames from "classnames";

function NotificationItem({ key, notification, onClick = () => {} }) {
  return (
    <ListItem
      key={key}
      disableGutters
      className={classNames({
        "bg-slate-200": notification.is_active,
        "": notification.is_active,
      })}
    >
      <ListItemButton
        className="flex flex-row justify-center items-start"
        onClick={() => onClick(notification)}
      >
        <ListItemText
          primary={notification.title}
          secondary={
            notification.body.length >= 40
              ? notification.body.slice(0, 35) + "..."
              : notification.body
          }
        />
        <span className="absolute right-0 opacity-70">
          {notification.created_at}
        </span>
      </ListItemButton>
    </ListItem>
  );
}

export default NotificationItem;
