import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

function ExpenseItem({
  key,
  expense,
  edit = false,
  onCheck = () => {},
  isChecked,
  showRegardingName = true,
}) {
  const navigate = useNavigate();
  const [primaryText, setPrimaryText] = useState("");

  useEffect(() => {
    let text = `${expense.name}${
      showRegardingName ? " - " + expense.regarding_name : ""
    }`;
    if (edit) {
      if (text.length > 23) {
        text = text.slice(0, 20) + "...";
      }
    } else {
      if (text.length > 30) {
        text = text.slice(0, 25) + "...";
      }
    }
    setPrimaryText(text);
  }, [edit]);

  return (
    <ListItem
      key={key}
      disableGutters
      disablePadding
      onClick={edit ? null : () => navigate(`/despesa/${expense.id}`)}
    >
      {edit ? (
        expense.regarding_is_closed ? (
          <LockOutlinedIcon sx={{ color: "red" }} size="small" />
        ) : (
          <Checkbox onClick={onCheck} checked={isChecked} size="small" />
        )
      ) : (
        ""
      )}
      <ListItemButton className="flex flex-row justify-center items-start">
        <ListItemText
          primary={
            <div className="flex">
              <Typography>
                {primaryText}
              </Typography>
            </div>
          }
          secondary={
            <React.Fragment>
              <span className="text-sm">
                {expense.payment_status +
                  " - " +
                  expense.payments
                    .map(({ payer_name }) => payer_name)
                    .join(", ")}
              </span>
            </React.Fragment>
          }
          sx={{width:"60%"}}
        />
        <div className="flex flex-col items-end">
          <span>R$ {expense.cost}</span>
          <span className="text-xs opacity-80">{expense.date}</span>
        </div>
      </ListItemButton>
    </ListItem>
  );
}

export default ExpenseItem;
