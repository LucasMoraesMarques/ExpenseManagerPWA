import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import RecentAction from "../components/RecentAction";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import GroupItem from "../components/GroupItem";
import Grid from "@mui/material/Grid";
import DashItem from "../components/DashItem";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import NoData from "../components/NoData";
import EastIcon from "@mui/icons-material/East";
import {
  askForPermissionToReceiveNotifications,
  getMedia,
} from "../services/permissions";
import { getMessagingToken } from "../services/firebase";

function Home() {
  const dispatch = useDispatch();
  const groupState = useSelector((state) => state.group);
  const regardingState = useSelector((state) => state.regarding);
  const expenseState = useSelector((state) => state.expense);
  const actionState = useSelector((state) => state.action);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const { user } = useOutletContext();

  useEffect(() => {
    let count = 0;
    if (expenseState.userExpenses.length > 0) {
      for (let expense of expenseState.userExpenses) {
        count += expense.items.length;
      }
      setNumberOfItems(count);
    }
  }, [expenseState.userExpenses]);

  return (
    <div>
      <div className="my-3">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="center"
        >
          <Grid item xs={5}>
            <DashItem title="Grupos" value={groupState.userGroups.length} />
          </Grid>
          <Grid item xs={5}>
            <DashItem
              title="Referências"
              value={regardingState.userRegardings.length}
            />
          </Grid>
          <Grid item xs={5}>
            <DashItem
              title="Despesas"
              value={expenseState.userExpenses.length}
            />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Items" value={numberOfItems} />
          </Grid>
        </Grid>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <span className="font-bold text-xl">Grupos</span>
        <span className="align-middle">
          <Link to="/grupos">
            <EastIcon />
          </Link>
        </span>
      </div>
      {groupState.userGroups.length > 0 ? (
        <List component={Stack} direction="row" className="overflow-y-scroll">
          {groupState.userGroups.map((item) => {
            return <GroupItem variant="rounded" key={item.id} group={item} />;
          })}
        </List>
      ) : (
        <NoData message="Nenhum grupo encontrado" />
      )}
      <div>
        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold text-xl">Atividades Recentes</span>
          <span className="align-middle">
            <Link to="/historico-de-acoes">
              <EastIcon />
            </Link>
          </span>
        </div>

        <List>
          {actionState.groupsActions.length > 0 ? (
            actionState.groupsActions.slice(0, 5).map((item) => {
              return (
                <RecentAction variant="rounded" key={item.id} action={item} />
              );
            })
          ) : (
            <NoData message="Nenhuma atividade recente encontrada" />
          )}
        </List>
        <div style={{ height: "50px" }}></div>
      </div>
    </div>
  );
}

export default Home;
