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
import Item from "../components/Item";
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
import ExpenseItem from "../components/ExpenseItem";
import CustomModal from "../components/CustomModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ExpenseList() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
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
        <IconButton onClick={() => setOpenModal(true)}>
          <FilterListIcon />
        </IconButton>
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
                  Filtrar despesas
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
              <div className="my-3 flex flex-row justify-between">
                <TextField
                  id="outlined-basic"
                  label="Valor Inicial"
                  variant="outlined"
                  size="medium"
                  sx={{ margin: "10px 0px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  className="w-[45%]"
                />
                <TextField
                  id="outlined-basic"
                  label="Valor Final"
                  variant="outlined"
                  size="medium"
                  sx={{ margin: "10px 0px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  className="w-[45%]"
                />
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
              <Autocomplete
                multiple
                id="tags-standard"
                options={groups}
                filterSelectedOptions
                label="Validação"
                getOptionLabel={(option) => option.label}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Validação"
                    placeholder="Selecione a validação"
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

      <span className="font-bold text-lg">Resultados de "pesquisa"</span>
      <List>
        <ExpenseItem />
        <ExpenseItem />
        <ExpenseItem />
      </List>
    </div>
  );
}

export default ExpenseList;
