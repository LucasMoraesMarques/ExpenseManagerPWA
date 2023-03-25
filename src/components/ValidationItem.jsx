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
import { Link, useNavigate, Location } from "react-router-dom";

function ValidationItem({key, validation}) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <ListItem
    key={key}
    disableGutters
    >
      <ListItemButton className="flex flex-row justify-center items-start" onClick={() => navigate(`/despesa/${validation.expense.id}`)}>
      
        <ListItemText primary={`${validation.requested_by} solicitou sua validação na despesa ${validation.expense.name}`} secondary={`Solicitada em ${validation.created_at}`} />
      </ListItemButton>
      <div className='flex flex-row justify-center items-start'>
        <IconButton><CheckBoxIcon color='success'/></IconButton>
        <IconButton onClick={() => setOpenModal(true)}><DisabledByDefaultIcon sx={{ color: "red" }}/></IconButton>
      </div>
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