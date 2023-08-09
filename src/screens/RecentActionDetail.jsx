import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";

const iconsByAction = {
  CREATE: "Criação",
  UPDATE: "Atualização",
  DELETE: "Exclusão",
};

function RecentActionDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const actionState = useSelector((state) => state.action);
  const [action, setAction] = useState({});

  useEffect(() => {
    let index = actionState.groupsActions.findIndex((item) => item.id == id);
    if (index != -1) {
      setAction({ ...actionState.groupsActions[index] });
    }
  }, []);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Detalhes da ação
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[95vw] mx-auto my-3">
        <h5 className="font-bold">Descrição </h5>
        <span className="ml-[10px] text-sm">{action.description}</span>
        <h5 className="font-bold mt-2">Membro</h5>
        <span className="ml-[10px] text-sm">
          {"user" in action ? action.user.full_name : "-"}
        </span>
        <h5 className="font-bold mt-2">Grupo de Despesa</h5>
        <span className="ml-[10px] text-sm">
          {"expense_group" in action ? action.expense_group : "-"}
        </span>
        <h5 className="font-bold">Data da Ação </h5>
        <span className="ml-[10px] text-sm">{action.created_at}</span>
        <h5 className="font-bold mt-2">Tipo de Ação</h5>
        <span className="ml-[10px] text-sm">{iconsByAction[action.type]}</span>
        {action.type == "UPDATE" ? (
          <>
            <h5 className="font-bold">Alterações </h5>
            <dl className="ml-[10px]">
              {action.changes_json &&
                Object.keys(action.changes_json).map((key) => {
                  return (
                    <>
                      <dt className="font-bold capitalize">
                        {action.changes_json[key] ? key : ""}
                      </dt>
                      {action.changes_json[key].split("\n").map((change) => {
                        return change ? (
                          <dd className="ml-[20px]">&#8594;{change}</dd>
                        ) : (
                          ""
                        );
                      })}
                    </>
                  );
                })}
            </dl>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default RecentActionDetail;
