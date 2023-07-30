import React from 'react'
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../components/NoData';
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegardingList() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()
  const regardingState = useSelector(state => state.regarding)
  const [filteredRegardings, setFilteredRegardings] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newRegardings = regardingState.userRegardings.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition =
          item.name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(upperValue) ||
          item.group_name.toUpperCase().includes(upperValue);
        if (condition) {
          return true;
        }
      }
    });
    setFilteredRegardings([...newRegardings]);
  };

  useEffect(() => {
    setFilteredRegardings([...regardingState.userRegardings]);
    console.log(regardingState.userRegardings)
  }, []);

  return (
    <div className="w-[95vw] mx-auto grow">
      <div className='flex flex-row justify-between'>
      <TextField
          id="outlined-basic"
          label="Pesquisa"
          placeholder="Filtre as referências por nome"
          variant="outlined"
          value={search}
          onChange={handleChangeSearch}
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
        {/*<IconButton onClick={() => setOpenModal(true)}><FilterListIcon/></IconButton>*/}
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
                  Filtrar Referências
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
              <div className="my-3 flex flex-row justify-between">
                <DatePicker className="w-[45%]" label="Data Inicial" />
                <DatePicker className="w-[45%] p-1" label="Data Final" />
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
                    label="Situação"
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
      
        <span className="font-bold text-lg">
        {search ? `Resultados de "${search}"` : ""}
      </span>
      <div className="flex flew-row justify-between items-center">
        <span className="text-sm">
          Mostrando {filteredRegardings.length} referências
        </span>
      </div>

      <List>
        {filteredRegardings.length > 0 ? (
          filteredRegardings.map((item) => {
            return <RegardingItem key={item.id} regarding={item} />;
          })
        ) : (
          <NoData message="Nenhuma referência encontrada" />
        )}
      </List>
      </div>
  )
}

export default RegardingList