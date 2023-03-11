import React from 'react'
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomModal from "../components/CustomModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ValidationItem({key}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ListItem
    key={key}
    disableGutters
    secondaryAction={
      <div>
        <IconButton><CheckBoxIcon color='success'/></IconButton>
        <IconButton onClick={() => setOpenModal(true)}><DisabledByDefaultIcon sx={{ color: "red" }}/></IconButton>
      </div>
    }
    >
      <ListItemButton className="flex flex-row justify-center items-start">
      
        <ListItemText primary="Work" secondary="Lucas, Baiano" />
        <p>R$ 2,50</p>
      </ListItemButton>
      <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          children={
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                Explique o que está errado!
              </Typography>

              <TextField
                id="outlined-basic"
                placeholder="Descreva aqui o motivo dessa despesa não ser válida."
                variant="outlined"
                size="medium"
                fullWidth
                multiline
                sx={{ margin: "10px 0px" }}
                
              />
            
              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained">Adicionar</Button>
              </Box>
            </>
          }
        />
        
      </ListItem>
  )
}

export default ValidationItem