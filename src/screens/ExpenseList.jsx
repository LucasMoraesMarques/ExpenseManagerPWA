import React from "react";
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
import NoData from "../components/NoData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenses } from "../services/expenses";
import { setExpenses } from "../redux/slices/expenseSlice";
import { loadRegardings } from "../services/regardings";
import { setRegardings } from "../redux/slices/regardingSlice";
import AlertToast from "../components/AlertToast";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];


function ExpenseList({ regarding = null }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const expenseState = useSelector((state) => state.expense);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const [message, setMessage] = useState({});


  const handleCheckbox = (id) => {
    let index = deleteIds.indexOf(id)
    console.log(id, index, deleteIds)
    if(index != -1){
      setDeleteIds(deleteIds.filter((item) => item != id))
    }
    else{
      let newIds = [...deleteIds]
      newIds.push(id)
      setDeleteIds([...newIds])
    }
  }


  const handleRemoveSelected = async () => {
    console.log(deleteIds)
    deleteExpenses('', deleteIds).then((flag) => {
      if(flag){
        let newExpenses = expenseState.userExpenses.filter((item) => !deleteIds.includes(item.id))
        setDeleteIds([])
        setEdit(false)
        dispatch(setExpenses([...newExpenses]))
        loadRegardings('').then((data) => dispatch(setRegardings([...data])))
        setMessage({
          severity: "success",
          title: "Sucesso!",
          body: "Despesas removidas com sucesso!",
        });

      }
      else{
        setMessage({
          severity: "error",
          title: "Erro!",
          body: "Tivemos problemas ao deletar as despesas. Tente novamente!",
        });
      }
      setOpen(true)
    })
  }

  useEffect(() => {
    console.log(deleteIds)

  }, [deleteIds])

  const handleChangeSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newExpenses = expenseState.userExpenses.filter((item) => {
      let condition1 = true;
      if (regarding) {
        condition1 = item.regarding == regarding;
      }
      for (let word of words) {
        word = word.trim();
        let condition2 =
          item.name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(upperValue) ||
          item.regarding_name.toUpperCase().includes(upperValue);
        if (condition1 && condition2) {
          return true;
        }
      }
    });
    setFilteredExpenses([...newExpenses]);
  };

  useEffect(() => {
    let expenses = expenseState.userExpenses
    if(regarding){
      expenses = expenses.filter((item) => item.regarding == regarding)
    }
    setFilteredExpenses(expenses);
  }, [expenseState]);

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <TextField
          id="outlined-basic"
          label="Pesquisa"
          placeholder="Filtre as despesas por nome"
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
        {true ? (
          <></>
        ) : (
          <IconButton onClick={() => setOpenModal(true)}>
            <FilterListIcon />
          </IconButton>
        )}

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

      <span className="font-bold text-lg">
        {search ? `Resultados de "${search}"` : ""}
      </span>
      <div className="flex flew-row justify-between items-center">
        <span className="text-sm">
          Mostrando {filteredExpenses.length} despesas
        </span>
        {edit ? (
          <div>
            <Button onClick={() => {setEdit(false);setDeleteIds([])}}>Cancelar</Button>
            <Button onClick={handleRemoveSelected}>Remover</Button>
          </div>
        ) : (
          <IconButton onClick={() => setEdit(true)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        )}
      </div>

      <List>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((item) => {
            return <ExpenseItem key={item.id} expense={item} edit={edit} onCheck={() => handleCheckbox(item.id)}/>;
          })
        ) : (
          <NoData message="Nenhuma despesa encontrada" />
        )}
      </List>
      <div className="mt-[50px]"></div>
      {Object.keys(message) && (
        <AlertToast
          severity={message.severity}
          title={message.title}
          message={message.body}
          open={open}
          onClose={() => {
            setOpen(false);
            setMessage({});
          }}
        />
      )}
    </div>
  );
}

export default ExpenseList;
