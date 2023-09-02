import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import classNames from "classnames";

function NotificationItem({ id, notification, onClick = () => {} }) {
  return (
    <ListItem
      key={id}
      disableGutters
      disablePadding
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
            <div className="flex flex-row justify-between">
              <span>{notification.body.length >= 40
              ? notification.body.slice(0, 35) + "..."
              : notification.body}
              </span>
              <span className="opacity-70">
          {notification.created_at}
        </span>
            </div>

            
          }
        />
        
      </ListItemButton>
    </ListItem>
  );
}

export default NotificationItem;
