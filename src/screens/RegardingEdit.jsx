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
import {
  createRegarding,
  editRegarding,
  loadRegardings,
} from "../services/regardings";
import { setRegardings } from "../redux/slices/regardingSlice";
import AlertToast from "../components/AlertToast";
import { loadActions } from "../services/actions";
import { setActions } from "../redux/slices/actionSlice";
import { addMessage } from "../redux/slices/messageSlice";
import { validateTextField } from "../services/utils";
import { useOutletContext } from "react-router-dom";

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
    expense_group: "",
  });
  const [inputValidation, setInputValidation] = useState({
    name: "",
    description: "",
  });
  const [users, setUsers] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [fieldsValid, setFieldsValid] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const {user} = useOutletContext()


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
  };

  const handleSaveRegarding = () => {
    setSaving(true);
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
      expense_group: inputStates.expense_group.id,
    };
    console.log(data);
    if (id) {
      editRegarding(user.api_token, id, data).then(({ flag, data }) => {
        if (flag) {
          let newRegarding = {
            ...data,
            is_closed: data.is_closed ? 1 : 0,
            start_date: `${data.start_date.slice(
              8,
              10
            )}-${data.start_date.slice(5, 7)}-${data.start_date.slice(0, 4)}`,
            end_date: `${data.end_date.slice(8, 10)}-${data.end_date.slice(
              5,
              7
            )}-${data.end_date.slice(0, 4)}`,
          };
          setRegarding(newRegarding);
          console.log(data);
          console.log(regardingState.userRegardings);
          let index = regardingState.userRegardings.findIndex(
            (item) => item.id == id
          );
          let newRegardings = [...regardingState.userRegardings];

          newRegardings[index] = { ...newRegardings[index], ...newRegarding };
          dispatch(setRegardings(newRegardings));
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Referência editada com sucesso!",
            })
          );
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
            })
          );
        }
      });
    } else {
      createRegarding(user.api_token, data).then(({ flag, data }) => {
        if (flag) {
          setRegarding({ ...inputStates, is_closed: false });
          loadRegardings(user.api_token).then((newRegardings) =>
            dispatch(setRegardings(newRegardings))
          );
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Referência adicionada com sucesso!",
            })
          );
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao criar a referência. Tente novamente!",
            })
          );
        }
      });
    }
    loadActions(user.api_token).then((json) => {
      dispatch(setActions(json));
      setSaving(false);
      navigate("/inicio");
    });
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
        expense_group: {
          id: data.expense_group.id,
          label: data.expense_group.name,
        },
      });
    }
  }, []);

  useEffect(() => {
    let validations = {
      name: validateTextField(inputStates.name, true),
      description: validateTextField(inputStates.description),
      expense_group: inputStates.expense_group,
      start_date: inputStates.start_date,
      end_date: inputStates.end_date,
    };
    setInputValidation(validations);
    setFieldsValid(Object.values(validations).every((item) => item));
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
                disabled={!fieldsValid || saving}
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
          error={!inputValidation.name ? true : false}
          helperText={!inputValidation.name ? "Não pode ser vazio" : ""}
          value={inputStates.name}
          onChange={handleChangeName}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          multiline
          error={!inputValidation.description ? true : false}
          helperText={!inputValidation.description ? "Não pode ser vazio" : ""}
          value={inputStates.description}
          onChange={handleChangeDescription}
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        {!id && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groupState.userGroups.map((item) => ({
              id: item.id,
              label: item.name,
            }))}
            renderInput={(params) => (
              <TextField {...params} label="Grupo" required />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size="medium"
            value={inputStates.expense_group}
            onChange={handleChangeExpenseGroup}
            sx={{ margin: "10px 0px" }}
          />
        )}
        <div className="my-3 flex flex-row justify-between">
          <DatePicker
            className="w-[45%]"
            label="Início *"
            value={inputStates.start_date}
            onChange={(value) => handleChangeDate(value, "start")}
          />
          <DatePicker
            className="w-[45%] p-1"
            label="Fim *"
            value={inputStates.end_date}
            onChange={(value) => handleChangeDate(value, "end")}
          />
        </div>
        {id && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={REGARDING_STATES}
            renderInput={(params) => <TextField {...params} label="Status" />}
            value={inputStates.is_closed}
            onChange={handleChangeIsClosed}
            size="medium"
            sx={{ margin: "10px 0px" }}
          />
        )}
      </div>
    </div>
  );
}

export default RegardingEdit;
