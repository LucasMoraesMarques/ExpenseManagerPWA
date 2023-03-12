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
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

function RegardingEdit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false)
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Criar Referência
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
          sx={{margin: '10px 0px'}}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          multiline
          rows={3}
          size="medium"
          fullWidth
          sx={{margin: '10px 0px'}}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groups}
          renderInput={(params) => <TextField {...params} label="Tipo de Referência" />}
          size="medium"
          sx={{margin: '10px 0px'}}
        />
        <TextField
          id="outlined-basic"
          label="Valor"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{margin: '10px 0px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
       
      </div>
    </div>
  );
}

export default RegardingEdit;
