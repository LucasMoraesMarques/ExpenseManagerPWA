import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Person2Icon from "@mui/icons-material/Person2";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CustomModal from "../components/CustomModal";
import Box from "@mui/material/Box";

const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

function Member({ key, variant = "rounded", add = false, edit = false}) {
  const [openModal, setOpenModal] = useState(false);

  return variant == "rounded" ? (
    <ListItem key={key} disableGutters disablePadding sx={{ width: "80px" }}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
          <span>Lucas</span>
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem key={key} disableGutters disablePadding className="w-full">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Lucas" secondary="Jan 7, 2014" />

      </ListItemButton>
      { add && 
      <span className="rounded-[50%] bg-slate-300 align-middle">
      <IconButton >
        <AddIcon />
      </IconButton>
    </span>

      }
      { edit && <>
        <Autocomplete
                id="tags-standard"
                options={groups}
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                sx={{width: '130px'}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Permissão"
                    placeholder="Permissão"
                    variant="outlined"
                  />
                )}
              />
        <IconButton onClick={() => setOpenModal(true)}><DisabledByDefaultIcon sx={{ color: "red" }}/></IconButton>
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
                Por quê você está excluindo esse membro?
              </Typography>

              <TextField
                id="outlined-basic"
                placeholder="Descreva aqui o motivo para mostrarmos ao usuário removido"
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
                <Button variant="contained">Confirmar</Button>
              </Box>
            </>
          }
        />
      </>
      
              

      }
      
    </ListItem>
  );
}

export default Member;
