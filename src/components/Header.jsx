import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <AppBar position="sticky">
  <Toolbar className='flex justify-between'>
  <div className='flex flex-row justify-center items-center'>
  <Link to="/conta">
  <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <AccountCircleOutlinedIcon sx={{height: '30px', width: '30px'}}/>
    </IconButton>
    </Link>

    <p>Olá user!</p>
  </div>
  <Link to="/notificacoes">
  <IconButton edge="end" color="inherit" aria-label="menu" >
      <NotificationsNoneIcon sx={{height: '30px', width: '30px'}}/>
    </IconButton>
  </Link>
    
  </Toolbar>
</AppBar>
  )
}

export default Header