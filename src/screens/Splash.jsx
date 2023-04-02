import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setGroups } from '../redux/slices/groupSlice';
import { loadGroups } from '../services/groups';
import { setRegardings } from '../redux/slices/regardingSlice';
import { loadRegardings } from '../services/regardings';
import { loadExpenses } from '../services/expenses';
import { loadNotifications } from '../services/notifications';
import { loadValidations } from '../services/validations';
import { loadUsers } from '../services/user';
import { setExpenses } from '../redux/slices/expenseSlice';
import { setValidations } from '../redux/slices/validationSlice';
import { setNotifications } from '../redux/slices/notificationSlice';
import { setUsers, setWallet, setCurrentUser } from '../redux/slices/userSlice';
import { loadActions } from '../services/actions';
import { setActions } from '../redux/slices/actionSlice';


function Splash() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const loadResources = async () => {
    loadGroups('').then((json) => {
      dispatch(setGroups(json))
    })
    loadRegardings('').then((json) => {
      dispatch(setRegardings(json))
    })
    loadExpenses('').then((json) => {
      dispatch(setExpenses(json))
    })
    loadNotifications('').then((json) => {
      dispatch(setNotifications(json))
    })
    loadValidations('').then((json) => {
      dispatch(setValidations(json))
    })
    loadUsers('').then((json) => {
      dispatch(setUsers(json))
      dispatch(setCurrentUser(json[0]))
      dispatch(setWallet(json[0].wallet))
    })
    loadActions('').then((json) => {
      dispatch(setActions(json))
    })
    redirect()
  }


  const redirect = () => {
    setTimeout(() => navigate("/inicio"), 3000)
  }

  useEffect(()=> {
    loadResources()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-cyan-700'>
      <span className='text-white text-2xl my-3'>Expense Manager</span>
      <CircularProgress sx={{color: 'white'}}/>
    </div>
  )
}

export default Splash