import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomModal from "../components/CustomModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ConfirmationModal from "../components/ConfirmationModal";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";


const METHODS = {
  DEBIT: "CARTÃO DE DÉBITO",
  CREDIT: "CARTÃO DE CRÉDITO",
  CASH: "DINHEIRO",
};

function PaymentMethodItem({ key, method, onDelete = () => {} }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ListItem
      key={key}
      disableGutters
      secondaryAction={
        <div>
          <IconButton onClick={() => setOpenModal(true)}>
            {method.has_payments ?
            <HelpOutlineOutlinedIcon
            sx={{ color: "orange" }}
          /> :
          <DisabledByDefaultIcon sx={{ color: "red" }} />

            }
          </IconButton>
         
        </div>
      }
    >
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText
          primary={`${METHODS[method.type]} - ${method.description}`}
          secondary={
            method.type == "CREDIT"
              ? `R$ ${method.limit} - Dia ${method.compensation_day}`
              : ""
          }
        />
      </ListItemButton>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        children={
          <>
          {method.has_payments ?
          <ConfirmationModal
          title="Alerta"
          message={`Esse método tem ${method.number_of_payments} pagamentos associados. Para deletá-lo, remova os pagamentos primeiro.`}
          onCancel={() => setOpenModal(false)}
          confirmButtonText="OK"
        />:
            <ConfirmationModal
              message={`Você realmente deseja deletar o método de pagamento ${method.description}?`}
              onCancel={() => setOpenModal(false)}
              onConfirm={() => onDelete(method.id)}

            />
          }
          </>
        }
      />
    </ListItem>
  );
}

export default PaymentMethodItem;
