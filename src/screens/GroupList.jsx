import React from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import RegardingItem from "../components/RegardingItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../components/CustomModal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import GroupItem from "../components/GroupItem";
import TagIcon from '@mui/icons-material/Tag';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GroupList() {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="">
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
            Grupos
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className=" w-[95%] mx-auto">
        <div className="flex flex-row justify-between">
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            size="medium"
            fullWidth
            sx={{ margin: "10px 0px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

        </div>

        <span className="font-bold text-lg">Resultados de "pesquisa"</span>
        <List>
          <GroupItem variant="full"/>
        </List>
      </div>
      <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <TagIcon />
          </IconButton>
          <TextField
          id="outlined-basic"
          label="Entre em um grupo pelo código"
          size="medium"
          fullWidth
          sx={{margin: '10px 0px'}}
          placeholder="Digite o código do grupo"
          
        />
        <IconButton color="inherit" aria-label="open drawer">
            <LoginOutlinedIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default GroupList;
