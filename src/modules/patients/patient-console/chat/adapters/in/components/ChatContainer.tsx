import React, { useContext } from 'react';
import Chat from 'src/modules/patients/patient-console/chat/adapters/in/components/Chat';
import { ChatContext } from 'src/modules/patients/patient-console/patient-sidebar/context/ChatContext';

function ChatContainer() {

  return (
    <>
      <Chat />
    </>
  );
}

export default ChatContainer;
