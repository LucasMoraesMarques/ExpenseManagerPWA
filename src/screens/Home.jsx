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

const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];
function Home() {
  return (
    <div>
      <div className="mt-3">
        <div className="bg-[#e2e2e2] rounded-md  w-[80%] m-auto p-5 flex flex-row justify-between">
          <div>
            <span>Selecione o grupo ativo</span>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={groups}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </div>
          <IconButton ><VisibilityIcon/></IconButton>
        </div>
        <div className="flex flex-row justify-between w-full">
          <Typography variant="h6" component="h6">
            Membros
          </Typography>
          <span className="align-middle">
            <Link to="/">Ver todos</Link>
          </span>
        </div>

        <List component={Stack} direction="row" className="overflow-y-scroll">
          <Member />
          <Member />
        </List>
      </div>
      <div>
        
      </div>
      <div>
        <div className="flex flex-row justify-between w-full">
          <Typography variant="h6" component="h6">
            Atividades Recentes
          </Typography>
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
