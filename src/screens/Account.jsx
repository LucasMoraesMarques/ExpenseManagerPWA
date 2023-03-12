import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NotificationItem from "../components/NotificationItem";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bg-white text-black min-h-[calc(100vh-110px)]"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Account() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editRegarding = () => {
    setAnchorEl(null);
    navigate("/editar-referencia/5");
  };
  return (
    <div className="min-h-screen">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sua conta
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col justify-center w-full h-[200px] items-center">
        <Avatar sx={{ bgcolor: "orange", width: 100, height: 100 }}>LM</Avatar>
        <span className="font-bold text-xl">Lucas</span>
      </div>
      <div className="w-[95%] mx-auto">
        <List>
          <ListItem>
              <ListItemButton sx={{ borderBottom: "1px solid #94a3b8" }} onClick={() => navigate("/metodos-de-pagamento")}>
                <ListItemIcon>
                  <PermIdentityOutlinedIcon sx={{ width: 35, height: 35 }} />
                </ListItemIcon>
                <ListItemText primary="Dados pessoais" />
              </ListItemButton>
          </ListItem>
          <ListItem>
              <ListItemButton sx={{ borderBottom: "1px solid #94a3b8" }} onClick={() => navigate("/metodos-de-pagamento")}>
                <ListItemIcon>
                  <WalletOutlinedIcon sx={{ width: 35, height: 35 }} />
                </ListItemIcon>
                <ListItemText primary="Metódos de Pagamento" />
              </ListItemButton>
          </ListItem>
          <ListItem>
              <ListItemButton sx={{ borderBottom: "1px solid #94a3b8" }} onClick={() => navigate("/metodos-de-pagamento")}>
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
