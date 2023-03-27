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
import Chip from "@mui/material/Chip"
import { stringAvatar } from "../services/utils";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];



function Member({ key, member, variant = "rounded", add = false, edit = false, onAdd=()=>{}, onEdit=()=>{}}) {
  const [openModal, setOpenModal] = useState(false);
  if(member) {
    let fullName = member.first_name + ' ' + member.last_name
    return variant == "rounded" ? (
    <ListItem key={key} disableGutters disablePadding sx={{ width: "80px" }}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar {...stringAvatar(fullName)}/>
          <span>{fullName}</span>
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem key={key} disableGutters disablePadding className="w-full">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar {...stringAvatar(fullName)}/>
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={"Desde " + "Jan 7, 2014"} />
        {!(true) ? <Chip label="Admin" color="primary"/> : <></>}
      </ListItemButton>
      { add && 
      <span className="rounded-[50%] bg-slate-300 align-middle">
      <IconButton onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </span>

      }
      { edit && <>
        {/*<Autocomplete
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
              />*/}
        <IconButton onClick={onEdit}><DisabledByDefaultIcon sx={{ color: "red" }}/></IconButton>
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
  );}
  else {
    return <></>
  }
}

export default Member;
