import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

function Header() {
  const notificationState = useSelector((state) => state.notification);
  const validationState = useSelector((state) => state.validation);
  const [count, setCount] = useState(0);
  const {user} = useOutletContext()

  useEffect(() => {
    let activeNotifications = notificationState.userNotifications.filter(
      (notification) => notification.is_active
    );
    let activeValidations = validationState.userValidations.filter(
      (validation) => validation.is_active
    );
    setCount(activeNotifications.length + activeValidations.length);
  }, [notificationState, validationState]);
  return (
    <AppBar position="sticky">
      <Toolbar className="flex justify-between">
        <div className="flex flex-row justify-center items-center">
          <Link to="/conta">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AccountCircleOutlinedIcon
                sx={{ height: "30px", width: "30px" }}
              />
            </IconButton>
          </Link>

          <p>Olá, {user ? user.full_name : 'user'}!</p>
        </div>
        <Link to="/notificacoes">
          <IconButton  sx={{ color: "white" }} aria-label="menu">
            <Badge badgeContent={count} color="error" sx={{top:'0px'}}>
              <NotificationsNoneIcon sx={{ height: "30px", width: "30px" }} />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
