import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createRegarding, editRegarding } from "../services/regardings";
import { addMessage } from "../redux/slices/messageSlice";
import { validateTextField } from "../services/utils";
import { useOutletContext } from "react-router-dom";
import { setReload } from "../redux/slices/configSlice";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomModal from "../components/CustomModal";
import { CircularProgress } from "@mui/material";

const REGARDING_STATES = [
  { label: "Em andamento", id: 0 },
  { label: "Finalizada", id: 1 },
];

function RegardingEdit() {
  const navigate = useNavigate();
  let { id = null } = useParams();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
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
  const [fieldsValid, setFieldsValid] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const { user } = useOutletContext();

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeDate = (value, type) => {
    if (type == "start") {
      setInputStates({ ...inputStates, start_date: dayjs(value.$d) });
    } else if (type == "end") {
      setInputStates({ ...inputStates, end_date: dayjs(value.$d) });
    }
    setFieldsChanged(true);
  };

  const handleChangeIsClosed = (e, value) => {
    setInputStates({ ...inputStates, is_closed: value });
    setFieldsChanged(true);
  };

  const handleChangeExpenseGroup = (e, value) => {
    setInputStates({ ...inputStates, expense_group: value });
    setFieldsChanged(true);
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
          let index = regardingState.userRegardings.findIndex(
            (item) => item.id == id
          );
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Referência editada com sucesso!",
            })
          );
          navigate(`/inicio`);
          dispatch(setReload(true));
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
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Referência adicionada com sucesso!",
            })
          );
          navigate("/inicio");
          dispatch(setReload(true));
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
  };

  useEffect(() => {
    let index = regardingState.userRegardings.findIndex(
      (item) => item.id == id
    );
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

  const handleLeaveForm = () => {
    if (fieldsChanged) {
      setOpenConfirmationModal(true);
    } else {
      window.history.back();
    }
  };

  const leaveWithoutSaving = () => {
    window.onpopstate = {};
    window.onbeforeunload = {};
    navigate(`/inicio`);
  };

  useEffect(() => {
    if (fieldsChanged) {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function (event) {
        window.history.go(1);
        setOpenConfirmationModal(true);
      };
      window.onbeforeunload = () => false;
    }
  }, [fieldsChanged]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton callback={handleLeaveForm} />
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
                disabled={!fieldsValid || saving || !fieldsChanged}
                onClick={handleSaveRegarding}
              >
                {saving ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : (
                  "Salvar"
                )}
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
      <CustomModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        children={
          <ConfirmationModal
            onCancel={() => setOpenConfirmationModal(false)}
            onConfirm={() => leaveWithoutSaving()}
            title="Confirmação de ação"
            message="Você deseja sair sem salvar as modificações?"
          />
        }
      />
    </div>
  );
}

export default RegardingEdit;
