import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DashItem from "../components/DashItem";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CustomModal from "../components/CustomModal";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import { useState } from "react";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];


function Stats() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Box className="w-[95%] mx-auto my-3">
      <Box className="flex flex-row justify-between mt-[10px] w-full items-center">
      <h5>Totais e Saldos</h5>

                <IconButton onClick={() => setOpenModal(true)}>
                  <FilterListIcon />
                </IconButton>
              </Box>
      
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <DashItem title="Total Geral" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Compartilhado" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Pessoal" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Saldo Compartilhado" />
          </Grid>
        </Grid>
      </Box>
      <Box className="w-[95%] mx-auto my-3">
        <h5>Detalhes de Pagamento</h5>
        <Box className="w-[75%] mx-auto my-3">
          <PieChart/>
        </Box>
      </Box>
      <Box className="w-[95%] mx-auto my-3">
        <h5>Compras por dia</h5>
        <Box className="w-[75%] mx-auto my-3">
        <LineChart/>
        </Box>
      </Box>
      <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          children={
            <div className="flex flex-col items-center w-[95%] mx-auto">
              
        <div className="flex flex-row justify-between w-full items-center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Filtrar dados
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Autocomplete
                multiple
                id="tags-standard"
                options={groups}
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grupos"
                    placeholder="Selecione os grupos"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                options={groups}
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Referências"
                    placeholder="Selecione as referências"
                    variant="outlined"
                  />
                )}
              />
              <div className="my-3 flex flex-row justify-between">
                <DatePicker className="w-[45%]" label="Data Inicial" />
                <DatePicker className="w-[45%] p-1" label="Data Final" />
              </div>
            
              <Autocomplete
                multiple
                id="tags-standard"
                options={groups}
                filterSelectedOptions
                label="Status de Pagamento"
                getOptionLabel={(option) => option.label}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status de Pagamento"
                    placeholder="Selecione os status"
                    variant="outlined"
                  />
                )}
              />
             
              <Box className="flex flex-row justify-between mt-[10px] w-full">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Limpar
                </Button>
                <Button variant="contained">Filtrar</Button>
              </Box>
            </div>
          }
        />
    </div>
  );
}

export default Stats;
