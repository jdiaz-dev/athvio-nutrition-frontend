import React from 'react';
import Chat from 'src/modules/Lab/lab6/chat';
import { ChatBody } from 'src/modules/patients/patient-console/chat/adapters/out/chat';

function Lab6(/* chat: ChatBody */) {
  const patient = {
    _id: '66493d52091cb4d8d83bedc4',
    user: {
      _id: '66493d52091cb4d8d83bedc6',
      firstname: 'lola1',
      lastname: 'lola1',
      photo: '',
    },
  };
  const chat = {
    _id: '665cbb65d5434f45f49804c1',
    patient: '66493d52091cb4d8d83bedc4',
    professional: '66493c26091cb4d8d83bedaf',
    comments: [
      {
        _id: '666e30abb3f5cd672e6735c0',
        commenter: 'professional',
        content: 'hi patient',
        createdAt: '2024-06-16T00:18:51.465Z',
      },
      {
        _id: '666e30b6b3f5cd672e6735c3',
        commenter: 'patient',
        content: 'hi couch',
        createdAt: '2024-06-16T00:18:51.465Z',
      },
      {
        _id: '666e30bfb3f5cd672e6735c6',
        commenter: 'patient',
        content: 'can you create my plan',
        createdAt: '2024-06-16T00:18:51.465Z',
      },
      {
        _id: '666e30c6b3f5cd672e6735c9',
        commenter: 'professional',
        content: 'of course',
        createdAt: '2024-06-16T00:18:51.465Z',
      },
    ],
  };

  return (
    <>
      <Chat patient={patient} chat={chat} />
    </>
  );
}

export default Lab6;
