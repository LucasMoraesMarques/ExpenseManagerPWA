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
import PaymentItem from "../components/PaymentItem";
import Item from "../components/Item";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from "@mui/icons-material/Search";
import Member from "../components/Member"

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
      className="bg-white text-black min-h-[calc(100vh-105px)]"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function GroupDetail() {
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

  const editGroup = () => {
    setAnchorEl(null);
    navigate("/editar-grupo/5")
  };
  return (
    <div>
      <AppBar position="sticky">
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
            Detalhes do grupo
          </Typography>
          {true && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={editGroup}>Editar</MenuItem>
                <MenuItem onClick={() => {}}>Deletar</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="w-[95%] mx-auto mt-3">
      <h5 className="font-bold">Nome</h5>
            <span className="ml-[10px] text-sm">Ref name</span>
            <h5 className="font-bold">Descrição</h5>
            <span className="ml-[10px] text-sm">Ref desc</span>
            <h5 className="font-bold">Data de Criação</h5>
            <span className="ml-[10px] text-sm"> 01/03/2023</span>
            <h5 className="font-bold">Número de Referências</h5>
            <span className="ml-[10px] text-sm"> 10</span>
            <h5 className="font-bold">Número de Despesas</h5>
            <span className="ml-[10px] text-sm"> 10</span>
            <h5 className="font-bold">Ativo ?</h5>
            <span className="ml-[10px] text-sm"> Sim</span>
            <h5 className="font-bold">Membros</h5>
            <List>
              <Member variant="full"/>
              <Member variant="full"/>
              <Member variant="full" />
              <Member variant="full" />

            </List>
        
      </div>
    </div>
  );
}

export default GroupDetail;