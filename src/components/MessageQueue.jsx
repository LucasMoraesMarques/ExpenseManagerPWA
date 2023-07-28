import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/slices/messageSlice';
import AlertToast from "./AlertToast";

function MessageQueue() {
  const [activeMessage, setActiveMessage] = useState({})
  const [open, setOpen] = useState(false)
  const messageState = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const removeMessageFromQueue = () => {
    let newMessagesQueue = [...messageState.messages]
    newMessagesQueue.shift()
    dispatch(setMessages(newMessagesQueue))
  }


  useEffect(() => {
    if(messageState.messages.length != 0){
        setOpen(true)
        let firstMessage = messageState.messages[0]
        setActiveMessage(firstMessage)
        setTimeout(removeMessageFromQueue, 3000)
    } else{
        setOpen(false)
    }
    console.log(activeMessage)
  }, [messageState])



  return (Object.keys(activeMessage).length != 0 ? (<AlertToast
          severity={activeMessage.severity}
          title={activeMessage.title}
          message={activeMessage.body}
          open={open}
          onClose={() => {
            setOpen(false)
          }}
  />) : <></>)
}

export default MessageQueue