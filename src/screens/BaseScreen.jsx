import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BottomNavigation, BottomNavigationAction, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Home from "../screens/Home";
import RegardingList from "../screens/RegardingList";
import ExpenseList from "../screens/ExpenseList";
import Stats from "../screens/Stats";
import GroupsIcon from '@mui/icons-material/Groups';


const actions = [
  { icon: <GroupsIcon />, name: 'Grupo', route: "/adicionar-grupo"},
  { icon: <PersonAddAltIcon />, name: 'Membro', route: "/adicionar-membro" },
  { icon: <CalendarMonthIcon />, name: 'Referência', route: "/criar-referencia" },
  { icon: <AttachMoneyIcon />, name: 'Despesa', route: "/criar-despesa" },
];

const screens = [<Home/>,<RegardingList/>,<ExpenseList/>,<Stats/>]

function BaseScreen() {
  const [screen, setScreen] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="text-gray-60 h-full">
      <Header />
      <div>
          {screens[screen]}
      </div>
     
      <div className="fixed bottom-[40px] mx-auto flex flex-row justify-center w-screen z-10">
      <SpeedDial
  ariaLabel="SpeedDial basic example"
  icon={<SpeedDialIcon />}
>
{actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={ () => navigate(action.route)}
          />
        ))}
</SpeedDial>
      </div>
      <BottomNavigation
        showLabels
        value={screen}
        onChange={(event, newValue) => {
          setScreen(newValue);
          console.log(newValue)
        }}
        className="fixed w-full bottom-0"
      >
        <BottomNavigationAction label="Início" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Referências"
          icon={<CalendarMonthIcon />}
        />
        <BottomNavigationAction label="Despesas" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Estatísticas" icon={<BarChartIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default BaseScreen;