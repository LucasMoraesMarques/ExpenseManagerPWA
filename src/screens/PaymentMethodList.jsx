import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import CustomModal from "../components/CustomModal";
import PaymentMethodItem from "../components/PaymentMethodItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BackButton from "../components/BackButton";
import dayjs, { Dayjs } from "dayjs";
import { createPaymentMethod } from "../services/payments";
import { useSelector, useDispatch } from "react-redux";

const PAYMENT_METHOD_TYPES = [
  "Cartão de Crédito",
  "Cartão de Débito",
  "Dinheiro",
];

function PaymentMethodList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [inputStates, setInputStates] = useState({
    type: "",
    description: "",
    wallet: "",
    limit: "",
    compensation_day: "",
  });
  const handleChangeType = (e, value) => {
    setInputStates({ ...inputStates, type: value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleChangeCompensationDay = (value) => {
    console.log(value);
    setInputStates({ ...inputStates, compensation_day: dayjs(value.$d) });
  };

  const handleChangeLimit = (e) => {
    setInputStates({ ...inputStates, limit: e.target.value });
  };

  const handleAddPaymentMethod = () => {
    console.log(inputStates);
    let data = {
      ...inputStates,
      date: `${inputStates.compensation_day.$y}-${(
        inputStates.compensation_day.$M + 1
      )
        .toString()
        .padStart(2, 0)}-${inputStates.compensation_day.$D
        .toString()
        .padStart(2, 0)}`,
    };
    console.log(data);
    createPaymentMethod("", data).then(({ flag, data }) => {
      console.log(flag, data);
      if (flag) {
        let newPaymentMethod = {
          ...data,
          date: `${data.compensation_day.slice(
            8,
            10
          )}-${data.compensation_day.slice(5, 7)}-${data.compensation_day.slice(
            0,
            4
          )}`,
        };

        /*setMessage({
          severity: "success",
          title: "Sucesso!",
          body: "Despesa editada com sucesso!",
        });
        setOpen(true);*/
      } else {
        /*setMessage({
          severity: "error",
          title: "Erro!",
          body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
        });
        setOpen(true);*/
      }
    });
  };
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
              />
              <Autocomplete
                id="tags-standard"
                options={PAYMENT_METHOD_TYPES}
                filterSelectedOptions
                value={inputStates.type}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="medium"
                onChange={handleChangeType}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    placeholder="Favorites"
                    variant="outlined"
                  />
                )}
              />
              {inputStates.type == "Cartão de Crédito" && (
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
                  />
                  <DatePicker
                    className="w-full"
                    label="Data de compensação"
                    value={inputStates.compensation_day}
                    onChange={handleChangeCompensationDay}
                  />
                </>
              )}

              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleAddPaymentMethod}>
                  Adicionar
                </Button>
              </Box>
            </>
          }
        />

        <List>
          {userState.users[0].wallet.payment_methods.map((method) => (
            <PaymentMethodItem method={method}/>
          ))}
        </List>
      </div>
    </div>
  );
}

export default PaymentMethodList;
