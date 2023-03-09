import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DashItem from "../components/DashItem";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";



function Stats() {
  return (
    <div>
      <Box className="w-[95%] mx-auto my-3">
        <div className="my-3 flex flex-row items-center">
        <DatePicker className="w-[40%]" />
        <DatePicker className="w-[40%] p-1" />
        <IconButton>
          <SearchIcon/>
        </IconButton>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <DashItem title="Total Geral" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Compartilhado" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Pessoal" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Saldo Compartilhado" />
          </Grid>
        </Grid>
      </Box>
      <Box className="w-[95%] mx-auto my-3">
        <h5>Detalhes de Pagamento</h5>
        <Box className="w-[75%] mx-auto my-3">
          <PieChart/>
        </Box>
      </Box>
      <Box className="w-[95%] mx-auto my-3">
        <h5>Compras por dia</h5>
        <Box className="w-[75%] mx-auto my-3">
        <LineChart/>
        </Box>
      </Box>
    </div>
  );
}

export default Stats;
