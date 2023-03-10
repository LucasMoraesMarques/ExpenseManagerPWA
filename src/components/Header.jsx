import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <AppBar position="sticky">
  <Toolbar variant="dense" className='flex justify-between'>
  <div className='flex flex-row justify-center items-center'>
  <Link to="/perfil">
  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <AccountCircleOutlinedIcon />
    </IconButton>
    </Link>

    <p>Olá user!</p>
  </div>
  <Link to="/notificacoes">
  <IconButton edge="end" color="inherit" aria-label="menu" >
      <NotificationsNoneIcon />
    </IconButton>
  </Link>
    
  </Toolbar>
</AppBar>
  )
}

export default Header