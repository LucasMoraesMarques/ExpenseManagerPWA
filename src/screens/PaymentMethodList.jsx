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

const PAYMENT_METHOD_TYPES = ["Cartão de Crédito", "Cartão de Débito", "Dinheiro"]

function PaymentMethodList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentType, setPaymentType] = useState("Dinheiro");
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
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
                fullWidth
                sx={{ margin: "10px 0px" }}
              />
              <Autocomplete
                id="tags-standard"
                options={PAYMENT_METHOD_TYPES}
                filterSelectedOptions
                value={paymentType}
                onChange={(event, value) => setPaymentType(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    placeholder="Favorites"
                    variant="outlined"
                    
                  />
                )}
              />
              {paymentType == "Cartão de Crédito" && (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Limite"
                    placeholder="Digite o limite do Cartão"
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
                  <DatePicker className="w-full" label="Data de compensação" />
                </>
              )}

              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained">Adicionar</Button>
              </Box>
            </>
          }
        />

        <List>
          <PaymentMethodItem />
          <PaymentMethodItem />
          <PaymentMethodItem />
        </List>
      </div>
    </div>
  );
}

export default PaymentMethodList;
