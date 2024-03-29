import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../services/user";
import { setCurrentUser } from "../redux/slices/userSlice";
import { addMessage } from "../redux/slices/messageSlice";
import {
  phoneMask,
  validateEmail,
  validatePhone,
  validateTextField,
} from "../services/utils";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomModal from "../components/CustomModal";
import { CircularProgress } from "@mui/material";

function ProfileEdit() {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [inputStates, setInputStates] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const [fieldsValid, setFieldsValid] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [fieldsValidation, setFieldsValidation] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
  });
  const [saving, setSaving] = useState(false);

  const handleChangeFirstName = (e) => {
    setInputStates({ ...inputStates, first_name: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeLastName = (e) => {
    setInputStates({ ...inputStates, last_name: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeEmail = (e) => {
    setInputStates({ ...inputStates, email: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangePhone = (e) => {
    setInputStates({ ...inputStates, phone: phoneMask(e.target.value) });
    setFieldsChanged(true);
  };

  const handleSaveUser = () => {
    setSaving(true);
    editUser(
      userState.currentUser.api_token,
      userState.currentUser.id,
      inputStates
    ).then(({ flag, data }) => {
      if (flag) {
        let newUser = {
          ...data,
          api_token: userState.currentUser.api_token,
        };
        dispatch(setCurrentUser(newUser));

        dispatch(
          addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Dados pessoais atualizados com sucesso!",
          })
        );
        setOpenModal(false);
      } else {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao atualizar seus dados. Tente novamente!",
          })
        );
        setOpenModal(false);
      }
    });
  };

  useEffect(() => {
    console.log(inputStates.phone);
    let user = userState.currentUser;
    let newFieldsValidation = {
      first_name: validateTextField(inputStates.first_name),
      last_name: validateTextField(inputStates.last_name),
      email: validateEmail(inputStates.email),
      phone: validatePhone(inputStates.phone),
    };
    setFieldsValidation(newFieldsValidation);
    setFieldsValid(Object.values(newFieldsValidation).every((item) => item));
  }, [inputStates]);

  useEffect(() => {
    let user = userState.currentUser;
    setInputStates({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    });
  }, []);

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
            Seus dados
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
                onClick={handleSaveUser}
                disabled={!fieldsValid || !fieldsChanged}
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
          value={inputStates.first_name}
          onChange={handleChangeFirstName}
          error={fieldsValidation.first_name ? false : true}
          helperText={
            fieldsValidation.first_name ? "" : "Não pode ficar em branco"
          }
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Sobrenome"
          value={inputStates.last_name}
          onChange={handleChangeLastName}
          error={fieldsValidation.last_name ? false : true}
          helperText={
            fieldsValidation.last_name ? "" : "Não pode ficar em branco"
          }
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label={
            userState.currentUser.google_id
              ? "Email (Registrado com o email do google)"
              : "Email"
          }
          variant="outlined"
          value={inputStates.email}
          onChange={handleChangeEmail}
          error={fieldsValidation.email ? false : true}
          helperText={fieldsValidation.email ? "" : "Email inválido"}
          type="email"
          rows={3}
          size="medium"
          fullWidth
          disabled={userState.currentUser.google_id}
          sx={{ margin: "10px 0px" }}
        />

        <TextField
          id="outlined-basic"
          label="Telefone"
          variant="outlined"
          value={inputStates.phone}
          onChange={handleChangePhone}
          error={fieldsValidation.phone ? false : true}
          helperText={fieldsValidation.phone ? "" : "Telefone inválido"}
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
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

export default ProfileEdit;
