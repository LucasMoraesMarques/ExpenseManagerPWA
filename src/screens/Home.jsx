import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import RecentAction from "../components/RecentAction";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Member from "../components/Member";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupItem from "../components/GroupItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DashItem from "../components/DashItem";
import { setGroups, setGroupID } from "../redux/slices/groupSlice";
import { useSelector, useDispatch } from "react-redux";
import { setRegardingID, setRegardings } from "../redux/slices/regardingSlice";
import { setExpenseID, setExpenses } from "../redux/slices/expenseSlice";
import { setValidationID, setValidations } from "../redux/slices/validationSlice";
import { createGroup, deleteGroup, editGroup, loadGroupById, loadGroups } from "../services/groups";
import { createExpense, editExpense } from "../services/expenses";


const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
function Home() {
  const dispatch = useDispatch()
  const groupState = useSelector((state) => state.group);
  const regardingState = useSelector((state) => state.regarding);
  const expenseState = useSelector((state) => state.expense);
  const actionState = useSelector((state) => state.action);
  const [numberOfItems, setNumberOfItems] = useState(0)

  useEffect(() => {
    let count = 0
    if(expenseState.userExpenses.length > 0){
      for(let expense of expenseState.userExpenses){
        count += expense.items.length
      }
      setNumberOfItems(count)
    }
    
  }, [expenseState.userExpenses])



  return (
    <div>
      <div className="mt-3">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
          <Grid item xs={5}>
            <DashItem title="Grupos" value={groupState.userGroups.length}/>
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Referências" value={regardingState.userRegardings.length}/>
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Despesas"  value={expenseState.userExpenses.length}/>
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Items" value={numberOfItems}/>
          </Grid>
        </Grid>
        <div className="flex flex-row justify-between w-full">
          <span className="font-bold text-xl">
            Grupos
          </span>
          <span className="align-middle">
            <Link to="/grupos">Ver todos</Link>
          </span>
        </div>

        <List component={Stack} direction="row" className="overflow-y-scroll">
        {groupState.userGroups.length > 0 && groupState.userGroups.map((item) => {
            return <GroupItem variant="rounded" key={item.id} group={item} />;
          })}
        </List>
      </div>
      <div>
        
      </div>
      <div className="mb-[50px]">
        <div className="flex flex-row justify-between w-full">
        <span className="font-bold text-xl">
            Atividades Recentes
          </span>
          <span className="align-middle">
            <Link to="/">Ver todos</Link>
          </span>
        </div>

        <List>
          {
        actionState.groupsActions.length > 0 && actionState.groupsActions.map((item) => {
            return <RecentAction variant="rounded" key={item.id} action={item} />;
          })}
        </List>
      </div>
    </div>
  );
}

export default Home;
