import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BackButton from "../components/BackButton";
import { addMessage } from "../redux/slices/messageSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { stringAvatar } from "../services/utils";
import { useOutletContext } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useOutletContext();

  const logout = () => {
    persistor.pause();
    persistor
      .flush()
      .then(() => {
        return persistor.purge();
      })
      .then(() => {
        localStorage.removeItem("persist:root");
        dispatch(
          addMessage({
            title: "",
            body: "Você saiu da sua conta!",
            severity: "success",
          })
        );
        setTimeout(() => navigate("/boas-vindas"), 2000);
      });
  };
  return (
    <div className="min-h-screen">
      <AppBar position="static">
        <Toolbar>
          <BackButton callback={()=> navigate('/inicio')}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sua conta
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col justify-center w-full h-[200px] items-center">
        <Avatar
          children={stringAvatar(user.full_name).children}
          sx={{
            width: 100,
            height: 100,
            ...stringAvatar(user.full_name).sx,
            fontSize: 30,
          }}
          size={60}
        />
        <span className="text-xl">{user.full_name}</span>
      </div>
      <div className="w-[95%] mx-auto">
        <List>
          <ListItem>
            <ListItemButton
              sx={{ borderBottom: "1px solid #94a3b8" }}
              onClick={() => navigate("/perfil")}
            >
              <ListItemIcon>
                <PermIdentityOutlinedIcon sx={{ width: 35, height: 35 }} />
              </ListItemIcon>
              <ListItemText primary="Dados pessoais" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{ borderBottom: "1px solid #94a3b8" }}
              onClick={() => navigate("/metodos-de-pagamento")}
            >
              <ListItemIcon>
                <WalletOutlinedIcon sx={{ width: 35, height: 35 }} />
              </ListItemIcon>
              <ListItemText primary="Metódos de Pagamento" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{ borderBottom: "1px solid #94a3b8" }}
              onClick={() => logout()}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon sx={{ width: 35, height: 35 }} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Account;
