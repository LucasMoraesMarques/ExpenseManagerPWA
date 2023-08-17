import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomModal from "../components/CustomModal";
import PaymentMethodItem from "../components/PaymentMethodItem";
import BackButton from "../components/BackButton";
import { createPaymentMethod, deletePaymentMethod } from "../services/payments";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUsers } from "../redux/slices/userSlice";
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";
import NoData from "../components/NoData";
import { loadUsers } from "../services/user";
import {
  moneyMask,
  validateCurrency,
  validateTextField,
} from "../services/utils";

const PAYMENT_METHOD_TYPES = [
  { id: "DEBIT", label: "Cartão de Débito" },
  { id: "CREDIT", label: "Cartão de Crédito" },
  { id: "CASH", label: "Dinheiro" },
];

function PaymentMethodList() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useOutletContext();

  const [inputStates, setInputStates] = useState({
    type: "",
    description: "",
    wallet: "",
    limit: "0,00",
    compensation_day: "",
  });
  const [fieldsValid, setFieldsValid] = useState(false);
  const [fieldsValidation, setFieldsValidation] = useState({
    description: false,
    type: false,
    limit: false,
    compensation_day: false,
  });

  const handleChangeType = (e, value) => {
    setInputStates({ ...inputStates, type: value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleChangeCompensationDay = (e) => {
    setInputStates({ ...inputStates, compensation_day: e.target.value });
  };

  const handleChangeLimit = (e) => {
    setInputStates({ ...inputStates, limit: moneyMask(e.target.value) });
  };

  const handleAddPaymentMethod = () => {
    setOpenModal(false);
    let paymentMethod = {
      type: inputStates.type.id,
      description: inputStates.description,
      wallet: user.wallet.id,
    };
    if (paymentMethod.type == "CREDIT") {
      paymentMethod.compensation_day = inputStates.compensation_day;
      paymentMethod.limit = inputStates.limit
        .replace(".", "")
        .replace(",", ".");
    }
    createPaymentMethod(user.api_token, paymentMethod).then(
      ({ flag, data }) => {
        if (flag) {
          let newPaymentsMethods = [...user.wallet.payment_methods, data];
          let newWallet = {
            id: user.wallet.id,
            payment_methods: newPaymentsMethods,
          };
          dispatch(setCurrentUser({ ...user, wallet: newWallet }));
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Método de pagamento adicionado com sucesso!",
            })
          );
          loadUsers(user.api_token).then((json) => {
            dispatch(setUsers(json));
          });
          setInputStates({
            type: "",
            description: "",
            wallet: "",
            limit: "0,00",
            compensation_day: "",
          });
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao criar o método. Tente novamente!",
            })
          );
        }
      }
    );
  };
  const handleDeletePaymentMethod = (id) => {
    setOpenModal(false);
    let index = user.wallet.payment_methods.findIndex((item) => item.id == id);
    if (index != -1) {
      deletePaymentMethod(user.api_token, id).then((flag) => {
        if (flag) {
          let newPaymentsMethods = [
            ...user.wallet.payment_methods.filter((item) => item.id != id),
          ];
          let newWallet = {
            id: user.wallet.id,
            payment_methods: newPaymentsMethods,
          };
          dispatch(setCurrentUser({ ...user, wallet: newWallet }));
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Método de pagamento deletado com sucesso!",
            })
          );
          loadUsers(user.api_token).then((json) => {
            dispatch(setUsers(json));
          });
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao deletar o método. Tente novamente!",
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    let newFieldsValidation = {
      description: validateTextField(inputStates.description, true),
      type: inputStates.type,
      limit: true,
      compensation_day: true,
    };
    if (inputStates.type) {
      if (inputStates.type.id == "CREDIT") {
        let day = parseInt(inputStates.compensation_day);
        newFieldsValidation.limit = validateCurrency(inputStates.limit);
        newFieldsValidation.compensation_day = 1 <= day && day <= 31;
      }
    }
    console.log(newFieldsValidation);
    setFieldsValidation(newFieldsValidation);
    setFieldsValid(Object.values(newFieldsValidation).every((item) => item));
  }, [inputStates]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Métodos de Pagamento
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto mt-3">
        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold text-xl">Métodos</span>
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
                Adicionar Método
              </Typography>

              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                size="medium"
                value={inputStates.description}
                onChange={handleChangeDescription}
                fullWidth
                sx={{ margin: "10px 0px" }}
                required
              />
              <Autocomplete
                id="tags-standard"
                disablePortal
                options={PAYMENT_METHOD_TYPES}
                value={inputStates.type}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="medium"
                onChange={handleChangeType}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    placeholder="Método de Pagamento"
                    required
                    variant="outlined"
                  />
                )}
              />
              {inputStates.type && inputStates.type.id == "CREDIT" && (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Limite"
                    placeholder="Digite o limite do Cartão"
                    variant="outlined"
                    value={inputStates.limit}
                    onChange={handleChangeLimit}
                    size="medium"
                    fullWidth
                    sx={{ margin: "10px 0px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <TextField
                    id="outlined-basic"
                    label="Dia"
                    placeholder="Dia de compensação"
                    variant="outlined"
                    value={inputStates.compensation_day}
                    onChange={handleChangeCompensationDay}
                    error={
                      inputStates.compensation_day &&
                      !fieldsValidation.compensation_day
                    }
                    helperText={
                      inputStates.compensation_day &&
                      !fieldsValidation.compensation_day &&
                      "Deve ser um valor entre 1 e 31"
                    }
                    size="medium"
                    fullWidth
                    sx={{ margin: "10px 0px" }}
                    type="number"
                    required
                  />
                </>
              )}

              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAddPaymentMethod}
                  disabled={!fieldsValid}
                >
                  Adicionar
                </Button>
              </Box>
            </>
          }
        />
        {user.wallet && user.wallet.payment_methods.length > 0 ? (
          <List>
            {user.wallet.payment_methods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                method={method}
                onDelete={handleDeletePaymentMethod}
              />
            ))}
          </List>
        ) : (
          <NoData message="Nenhum método de pagamento encontrado" />
        )}
      </div>
    </div>
  );
}

export default PaymentMethodList;
