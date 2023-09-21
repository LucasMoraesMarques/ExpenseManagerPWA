import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const STATUS = {
  VALIDATION: "EM VALIDAÇÃO",
  AWAITING: "AGUARDANDO",
  PAID: "PAGO",
  OVERDUE: "VENCIDO",
};

function PaymentItem({ key, payment, edit = false, onDelete = () => {}, onClick = () => {}  }) {
  return (
    <ListItem
      key={key}
      className="w-full"
      disablePadding
      disableGutters
      secondaryAction={
        edit ? (
          <IconButton onClick={() => onDelete(payment)} className="p-0" disableGutters disablePadding>
            <DisabledByDefaultIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <></>
        )
      }
    >
      {"payment_method" in payment && (
        <ListItemButton onClick={edit ? onClick : null} disableGutters disablePadding>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "blue" }}>
              {payment.payment_method.type == "CREDIT" ? (
                <CreditCardIcon sx={{ fontSize: "30px" }} />
              ) : (
                <LocalAtmIcon sx={{ fontSize: "30px" }} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={payment.payer_name}
            secondary={`${payment.payment_method.description} - ${
              STATUS[payment.payment_status]
            }`}
            sx={{ lineHeight: 1, margin: 0 }}
          />
          <span className="min-w-[80px] text-end text-md">
            R$ {payment.value}
          </span>
        </ListItemButton>
      )}
    </ListItem>
  );
}

export default PaymentItem;
