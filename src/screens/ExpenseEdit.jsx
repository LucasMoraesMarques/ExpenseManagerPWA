import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomModal from "../components/CustomModal";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { createExpense, loadExpenses, editExpense } from "../services/expenses";
import { loadRegardings } from "../services/regardings";
import { setExpenses } from "../redux/slices/expenseSlice";
import { setRegardings } from "../redux/slices/regardingSlice";
import AlertToast from "../components/AlertToast";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

function ExpenseEdit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let { id = null } = useParams();
  const expenseState = useSelector((state) => state.expense);
  const regardingState = useSelector((state) => state.regarding);
  const groupState = useSelector((state) => state.group);
  const [expense, setExpense] = useState({});
  const [inputStates, setInputStates] = useState({
    name: "",
    description: "",
    date: "",
    cost: "",
    regarding: "",
    items: []
  });
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState({});
  const [userOptions, setUserOptions] = useState([])
  const [fieldsValid, setFieldsValid] = useState(false);
  const [item, setItem] = useState({name: '', price: '', expense: '', consumers: []})
  const dispatch = useDispatch();

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleChangeDate = (value) => {
    console.log(value);
    setInputStates({ ...inputStates, date: dayjs(value.$d) });
  };

  const handleChangeCost = (e, value) => {
    setInputStates({ ...inputStates, cost: value });
  };


  const handleChangeRegarding = (e, value) => {
    if(Object.keys(value).length > 0){
      let regardingID = value.id
      let selectedRegarding = regardingState.userRegardings.find((item) => item.id == regardingID)
      console.log(selectedRegarding)
      if(selectedRegarding && Object.keys(selectedRegarding).length > 0){
        let groupId = selectedRegarding.expense_group
        console.log(selectedRegarding)
        let selectedGroup = groupState.userGroups.find((item) => item.id == groupId)
        if(selectedGroup && Object.keys(selectedGroup).length > 0){
          console.log(selectedGroup)
          setUserOptions(selectedGroup.members.map((item) => ({id:item.id, name:item.first_name + ' ' + item.last_name})))
        }

      }
    }
    setInputStates({ ...inputStates, regarding: value });
  };

  const handleAddItem = () => {
    setInputStates({...inputStates, items: [...inputStates.items, item]})
    setOpenModal(false)
    setItem({name: '', price: '', expense: '', consumers: []})
  }

  const handleDeleteItem = (instance) => {
    let newItems = [...inputStates.items]
    newItems = newItems.filter((item) => !(instance.id == item.id))
    setInputStates({...inputStates, items:newItems})
  }

  const handleChangeConsumers = (e, value) => {
    console.log(value)
    let newConsumers = []
    if(value.length > 0){
      value.map((item) => newConsumers.push(item.id))
    }
    console.log(newConsumers)
    setItem({...item, consumers: value, id:inputStates.items.length})
  }

  const handleSaveExpense = () => {
    let data = {
      ...inputStates,
      date: `${inputStates.date.$y}-${(inputStates.date.$M + 1)
        .toString()
        .padStart(2, 0)}-${inputStates.date.$D.toString().padStart(2, 0)}`,
      regarding: inputStates.regarding.id,
    };
    console.log(data);
    if (id) {
      editExpense("", id, data).then(({ flag, data }) => {
        if (flag) {
          let newExpense = {
            ...data,
            start_date: `${data.start_date.slice(
              8,
              10
            )}-${data.start_date.slice(5, 7)}-${data.start_date.slice(0, 4)}`,
          };
          setExpense(newExpense);
          console.log(data);
          console.log(expenseState.userExpenses);
          let index = expenseState.userExpenses.findIndex(
            (item) => item.id == id
          );
          let newExpenses = [...expenseState.userExpenses];

          newExpenses[index] = { ...newExpenses[index], ...newExpense };
          dispatch(setExpenses(newExpenses));
          setMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Despesa editada com sucesso!",
          });
          setOpen(true);
        } else {
          setMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
          });
          setOpen(true);
        }
      });
    } else {
      createExpense("", data).then(({ flag, data }) => {
        if (flag) {
          setExpense({ ...data, ...inputStates });
          loadRegardings("").then((newRegardings) =>
            dispatch(setRegardings(newRegardings))
          );
          setMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Despesa adicionada com sucesso!",
          });
          setOpen(true);
        } else {
          setMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao criar a despesa. Tente novamente!",
          });
          setOpen(true);
        }
      });
    }
  };

  useEffect(() => {
    let index = expenseState.userExpenses.findIndex((item) => item.id == id);
    console.log(id, index, expenseState.userExpenses);
    if (index != -1) {
      let data = expenseState.userExpenses[index];
      setExpense({ ...data });
      setInputStates({
        name: data.name,
        description: data.description,
        date: dayjs(
          `${data.date.slice(3, 5)}-${data.date.slice(0, 2)}-${data.date.slice(
            6,
            10
          )}`
        ),
        cost: data.cost,
        regarding: { id: data.regarding.id, label: data.regarding.name },
      });
    }
  }, []);

  useEffect(() => {
    console.log(inputStates);
    if (inputStates.name.trim() == "" || inputStates.description.trim() == "") {
      setFieldsValid(false);
    } else {
      setFieldsValid(true);
    }
  }, [inputStates]);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Adicionar Despesa
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
          error={inputStates.name.trim() == "" ? true : false}
          helperText={inputStates.name.trim() == "" ? "Não pode ser vazio" : ""}
          value={inputStates.name}
          onChange={handleChangeName}
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          multiline
          rows={3}
          error={inputStates.description.trim() == "" ? true : false}
          helperText={
            inputStates.description.trim() == "" ? "Não pode ser vazio" : ""
          }
          value={inputStates.description}
          onChange={handleChangeDescription}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <DatePicker
          className="w-full"
          label="Data"
          value={inputStates.date}
          onChange={(value) => handleChangeDate(value)}
        />
        <TextField
          id="outlined-basic"
          label="Valor"
          variant="outlined"
          size="medium"
          fullWidth
          value={inputStates.cost}
          onChange={handleChangeCost}
          sx={{ margin: "10px 0px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={regardingState.userRegardings.map((item) => ({
            id: item.id,
            label: item.name,
          }))}
          renderInput={(params) => <TextField {...params} label="Referência" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          size="medium"
          value={inputStates.regarding}
          onChange={handleChangeRegarding}
          sx={{ margin: "10px 0px" }}
        />
        {/*<IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ margin: "10px 0px" }}
          className="w-full"
        >
          <input hidden accept="image/*" type="file" />
          <AttachmentIcon className="-rotate-45" />
          <Typography variant="p" component="span">
            Adicionar Arquivos
          </Typography>
        </IconButton>*/}
        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold text-xl">Items</span>
          <span className="rounded-[50%] bg-slate-300 align-middle">
            <IconButton onClick={() => setOpenModal(true)}>
              <AddIcon />
            </IconButton>
          </span>
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
                Adicionar Item
              </Typography>

              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                size="medium"
                value={item.name}
                onChange={(e) => setItem({...item, name:e.target.value})}
                fullWidth
                sx={{ margin: "10px 0px" }}
              />
              <TextField
                id="outlined-basic"
                label="Preço"
                value={item.price}
                onChange={(e) => setItem({...item, price:e.target.value})}
                variant="outlined"
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                options={userOptions.map((item) => ({id:item.id, label:item.name}))}
                value={item.consumers}
                onChange={handleChangeConsumers}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Multiple values"
                    placeholder="Favorites"
                    variant="outlined"
                  />
                )}
              />
              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleAddItem} disabled={(item.name && item.price && item.consumers.length > 0) ? false : true}>Adicionar</Button>
              </Box>
            </>
          }
        />

        <List>
          {"items" in inputStates &&
            inputStates.items.map((item) => <Item key={item.id} item={item} edit={true} onDelete={handleDeleteItem}/>)}
        </List>
      </div>
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

export default ExpenseEdit;
