import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './components/chat-container';
import EmptyChatContainer from './components/empty-chat-container';
import ContactsContainer from './components/contacts-container';

function Chat() {

  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate])

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {
        selectedChatType === undefined 
        ? <EmptyChatContainer />
        : <ChatContainer /> 
      }
    </div>
  )
}

export default Chat;