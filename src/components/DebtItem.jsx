import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { stringAvatar } from "../services/utils";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function DebtItem({ key, payer, receiver, debt }) {
  return (
    <ListItem
      key={key}
      disableGutters
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <div className="flex flex-col justify-center items-center flex-1">
        <Avatar {...stringAvatar(payer)} size={10} />
        <span className="text-center">{payer}</span>
      </div>
      <div className="my-auto">
        <div className="flex flex-col justify-center items-center flex-2">
          <span className="text-center">deve R$ {debt} a </span>
          <ArrowRightAltIcon />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center flex-1">
        <Avatar {...stringAvatar(receiver)} size={10} />
        <span className="text-center">{receiver}</span>
      </div>
    </ListItem>
  );
}
export default DebtItem;
