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
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <Avatar {...stringAvatar(payer)} size={10} />
        <span className="">
          {payer.length >= 18 ? payer.slice(0, 13) + "..." : payer}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span>deve R$ {debt} a </span>
        <ArrowRightAltIcon />
      </div>

      <div className="flex flex-col justify-center items-center">
        <Avatar {...stringAvatar(receiver)} size={10} />
        <span className="">
          {receiver.length >= 18 ? receiver.slice(0, 13) + "..." : receiver}
        </span>
      </div>
    </ListItem>
  );
}
export default DebtItem;
