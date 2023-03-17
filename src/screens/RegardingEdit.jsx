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
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NoData from "../components/NoData";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { createRegarding, editRegarding, loadRegardings } from "../services/regardings";
import { setRegardings } from "../redux/slices/regardingSlice";
import AlertToast from "../components/AlertToast";

const REGARDING_STATES = [
  { label: "Em andamento", id: 0 },
  { label: "Finalizada", id: 1 },
];

function RegardingEdit() {
  const navigate = useNavigate();
  let { id = null } = useParams();
  const regardingState = useSelector((state) => state.regarding);
  const groupState = useSelector((state) => state.group);
  const [regarding, setRegarding] = useState({});
  const [inputStates, setInputStates] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_closed: REGARDING_STATES[0],
    expense_group: ""
  });
  const [users, setUsers] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState(false);
  const [fieldsValid, setFieldsValid] = useState(false);
  const dispatch = useDispatch();

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleChangeDate = (value, type) => {
    console.log(value, type);
    if (type == "start") {
      setInputStates({ ...inputStates, start_date: dayjs(value.$d) });
    } else if (type == "end") {
      setInputStates({ ...inputStates, end_date: dayjs(value.$d) });
    }
  };

  const handleChangeIsClosed = (e, value) => {
    setInputStates({ ...inputStates, is_closed: value });
  };

  const handleChangeExpenseGroup = (e, value) => {
    setInputStates({ ...inputStates, expense_group: value });

  }

  const handleSaveRegarding = () => {
    let data = {
      ...inputStates,
      is_closed: inputStates.is_closed.id,
      start_date: `${inputStates.start_date.$y}-${(
        inputStates.start_date.$M + 1
      )
        .toString()
        .padStart(2, 0)}-${inputStates.start_date.$D
        .toString()
        .padStart(2, 0)}`,
      end_date: `${inputStates.end_date.$y}-${(inputStates.end_date.$M + 1)
        .toString()
        .padStart(2, 0)}-${inputStates.end_date.$D.toString().padStart(2, 0)}`,
        expense_group: inputStates.expense_group.id
    };
    console.log(data);
    if (id) {
      editRegarding("", id, data).then(({ flag, data }) => {
        if (flag) {
          let newRegarding = {
            ...data,
            is_closed: data.is_closed ? 1 : 0,
            start_date: `${data.start_date.slice(8, 10)}-${data.start_date.slice(
              5,
              7
            )}-${data.start_date.slice(0, 4)}`,
            end_date: `${data.end_date.slice(8, 10)}-${data.end_date.slice(
              5,
            7
            )}-${data.end_date.slice(0, 4)}`
          }
          setRegarding(newRegarding);
          console.log(data);
          console.log(regardingState.userRegardings);
          let index = regardingState.userRegardings.findIndex(
            (item) => item.id == id
          );
          let newRegardings = [...regardingState.userRegardings];

          newRegardings[index] = { ...newRegardings[index], ...newRegarding };
          dispatch(setRegardings(newRegardings));
          setMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Referência editado com sucesso!",
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
      createRegarding("", data).then(({flag, data}) => {
        if (flag) {
          setRegarding({ ...inputStates, is_closed: false });
          loadRegardings('').then((newRegardings)=>dispatch(setRegardings(newRegardings)))
          ;
          setMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Referência adicionada com sucesso!",
          });
          setOpen(true);
        } else {
          setMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao criar a referência. Tente novamente!",
          });
          setOpen(true);
        }
      });
    }
  };

  useEffect(() => {
    let index = regardingState.userRegardings.findIndex(
      (item) => item.id == id
    );
    console.log(id, index, regardingState.userRegardings);
    if (index != -1) {
      let data = regardingState.userRegardings[index];
      setRegarding({ ...data });
      setInputStates({
        name: data.name,
        description: data.description,
        start_date: dayjs(
          `${data.start_date.slice(3, 5)}-${data.start_date.slice(
            0,
            2
          )}-${data.start_date.slice(6, 10)}`
        ),
        end_date: dayjs(
          `${data.end_date.slice(3, 5)}-${data.end_date.slice(
            0,
            2
          )}-${data.end_date.slice(6, 10)}`
        ),
        is_closed: data.is_closed ? REGARDING_STATES[1] : REGARDING_STATES[0],
        expense_group: {id: data.expense_group.id, label: data.expense_group.name}
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
            {id ? "Editar Referência" : "Criar Referência"}
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
                onClick={handleSaveRegarding}
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
          error={inputStates.name.trim() == "" ? true : false}
          helperText={inputStates.name.trim() == "" ? "Não pode ser vazio" : ""}
          value={inputStates.name}
          onChange={handleChangeName}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          multiline
          error={inputStates.description.trim() == "" ? true : false}
          helperText={
            inputStates.description.trim() == "" ? "Não pode ser vazio" : ""
          }
          value={inputStates.description}
          onChange={handleChangeDescription}
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        {!id && <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groupState.userGroups.map((item) => ({id: item.id, label: item.name}))}
          renderInput={(params) => <TextField {...params} label="Grupo" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          size="medium"
          value={inputStates.expense_group}
          onChange={handleChangeExpenseGroup}
          sx={{margin: '10px 0px'}}
          />}
        <div className="my-3 flex flex-row justify-between">
          <DatePicker
            className="w-[45%]"
            label="Início"
            value={inputStates.start_date}
            onChange={(value) => handleChangeDate(value, "start")}
          />
          <DatePicker
            className="w-[45%] p-1"
            label="Fim"
            value={inputStates.end_date}
            onChange={(value) => handleChangeDate(value, "end")}
          />
        </div>
        {id && <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={REGARDING_STATES}
          renderInput={(params) => <TextField {...params} label="Status" />}
          value={inputStates.is_closed}
          onChange={handleChangeIsClosed}
          size="medium"
          sx={{ margin: "10px 0px" }}
        />}
        
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

export default RegardingEdit;
