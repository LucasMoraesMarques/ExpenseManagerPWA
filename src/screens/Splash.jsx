import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function Splash() {
  const navigate = useNavigate();


  const redirect = () => {
    setTimeout(() => navigate("/boas-vindas"), 3000)
  }

  useEffect(()=> {
    redirect()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-cyan-700'>
      <span className='text-white text-2xl my-3'>Expense Manager</span>
      <CircularProgress sx={{color: 'white'}}/>
    </div>
  )
}

export default Splash