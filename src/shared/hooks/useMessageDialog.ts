import { useState } from 'react';

export const useMessageDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [messageOk, setMessageOk] = useState(false);
  const [alert, setAlert] = useState(false);

  return { openDialog, setOpenDialog, message, setMessage, messageOk, setMessageOk, alert, setAlert };
};
