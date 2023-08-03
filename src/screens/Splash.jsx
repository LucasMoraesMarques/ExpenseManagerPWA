import React from 'react'
import { useEffect, useState } from 'react'
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
import { setUsers, setCurrentUser } from '../redux/slices/userSlice';
import { loadActions } from '../services/actions';
import { setActions } from '../redux/slices/actionSlice';
import { addMessage } from '../redux/slices/messageSlice';

function Splash() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const [loadingText, setLoadingText] = useState('')
  let apiToken = userState.currentUser.api_token

  const loadResources = async () => {
    console.log('token ', apiToken)
    loadGroups(apiToken).then((json) => {
      setLoadingText('Carregando grupos ...')
      dispatch(setGroups(json))
    }).then(async () => {
      setLoadingText('Carregando referências ...')
      return loadRegardings(apiToken).then((json) => {
        dispatch(setRegardings(json))
      })
    }).then(async () => {
      setLoadingText('Carregando despesas ...')
      return loadExpenses(apiToken).then((json) => {
        dispatch(setExpenses(json))
      })
    }).then(async () => {
      setLoadingText('Carregando notificações ...')
      return loadNotifications(apiToken).then((json) => {
        dispatch(setNotifications(json))
      })
    }).then(async () => {
      setLoadingText('Carregando validações ...')
      return loadValidations(apiToken).then((json) => {
        dispatch(setValidations(json))
      })
    }).then(async () => {
      return loadUsers(apiToken).then((json) => {
        dispatch(setUsers(json))
        let currentUser = json.filter((user) => user.id ==userState.currentUser.id)[0]
        dispatch(setCurrentUser({...currentUser, api_token: apiToken}))
      })
    }).then(async () => {
      setLoadingText('Carregando ações ...')
      return loadActions(apiToken).then((json) => {
        dispatch(setActions(json))
      })
    }).then(()=>{
      redirect()
    }).catch((e) => {
      dispatch(addMessage({title: 'Erro', body:"Erro ao carregar os dados. Tente novamente!", severity:'error'}))
      setTimeout(() => navigate("/boas-vindas"), 2000);

    })
    
  }


  const redirect = () => {
    //setLoadingText('Tudo certo!')
    setTimeout(() => {
      navigate("/inicio")
      dispatch(addMessage({title: 'Success', body:`Bem vindo(a), ${userState.currentUser.full_name}!`, severity:'success'}))
    }, 3000)
  }

  useEffect(()=> {
    loadResources()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-cyan-700'>
      <span className='text-white text-2xl my-3'>Expense Manager</span>
      <CircularProgress sx={{color: 'white'}}/>
      <span className='text-white text-sm my-3'>{loadingText}</span>

    </div>
  )
}

export default Splash