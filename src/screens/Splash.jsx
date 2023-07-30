import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
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
  const userState = useSelector(state => state.user)
  let apiToken = userState.currentUser.api_token

  const loadResources = async () => {
    console.log('token ', apiToken)
    loadGroups(apiToken).then((json) => {
      dispatch(setGroups(json))
    })
    loadRegardings(apiToken).then((json) => {
      dispatch(setRegardings(json))
    })
    loadExpenses(apiToken).then((json) => {
      dispatch(setExpenses(json))
    })
    loadNotifications(apiToken).then((json) => {
      dispatch(setNotifications(json))
    })
    loadValidations(apiToken).then((json) => {
      dispatch(setValidations(json))
    })
    loadUsers(apiToken).then((json) => {
      dispatch(setUsers(json))
      dispatch(setWallet(userState.currentUser.wallet))
    })
    loadActions(apiToken).then((json) => {
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