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
import Item from "../components/Item";
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BackButton from "../components/BackButton";

function ProfileEdit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
        <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Seus dados
          </Typography>
          {true && (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                variant="outlined"
              >
                Salvar
              </Button>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto">
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Sobrenome"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Telefone"
          variant="outlined"
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
       
      </div>
    </div>
  );
}

export default ProfileEdit;
