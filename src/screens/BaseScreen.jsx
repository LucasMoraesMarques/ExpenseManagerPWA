import React, { useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/slices/messageSlice';
import Message from '../components/Message';

const actions = [
  { icon: <GroupsIcon />, name: 'Grupo', route: "/criar-grupo"},
  { icon: <CalendarMonthIcon />, name: 'Referência', route: "/criar-referencia" },
  { icon: <AttachMoneyIcon />, name: 'Despesa', route: "/criar-despesa" },
];

const screens = [<Home/>,<RegardingList/>,<ExpenseList/>,<Stats/>]

function BaseScreen() {
  const [screen, setScreen] = useState(0);
  const navigate = useNavigate();
  const messageState = useSelector((state) => state.message);
  const dispatch = useDispatch();

  
  const addMessage = () => {
    dispatch(setMessages([{
      id: Math.random(),
      severity: "success",
      title: "Sucesso!",
      body: `Mensagem 1 adicionada com sucesso!`,
    }, {
      id: Math.random(),
      severity: "error",
      title: "Sucesso!",
      body: `Mensagem 1 adicionada com sucesso!`,
    }, {
      id: Math.random(),
      severity: "success",
      title: "Sucesso!",
      body: `Mensagem 2 adicionada com sucesso!`,
    },
    {
      id: Math.random(),
      severity: "warning",
      title: "Sucesso!",
      body: `Mensagem 2 adicionada com sucesso!`,
    }]))
    
  }

  


  return (
    <div className="text-gray-60 h-full">
      <Header />
      <div className='w-[95%] mx-auto'>
      <button onClick={() => addMessage()}>dfg</button>
          {screens[screen]}
      </div>
     
      <SpeedDial
  ariaLabel="SpeedDial basic example"
  icon={<SpeedDialIcon />}
  style={{position:'fixed', bottom: '40px', margin: '0px auto'}}
  className='mx-auto w-full'
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
      <Message/>
    </div>
  );
}

export default BaseScreen;
