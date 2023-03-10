import React from "react";
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

const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
function Home() {
  return (
    <div>
      <div className="mt-3">
        
        <div className="flex flex-row justify-between w-full">
          <span className="font-bold text-xl">
            Grupos
          </span>
          <span className="align-middle">
            <Link to="/">Ver todos</Link>
          </span>
        </div>

        <List component={Stack} direction="row" className="overflow-y-scroll">
          <GroupItem />
          <GroupItem />
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
          <RecentAction />
          <RecentAction />

          <RecentAction />

          <RecentAction />
          <RecentAction />
        </List>
      </div>
    </div>
  );
}

export default Home;
