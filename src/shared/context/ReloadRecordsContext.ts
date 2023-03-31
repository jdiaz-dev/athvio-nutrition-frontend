import { createContext, useState } from 'react';

export const ReloadRecordListContext = createContext<{
  reloadRecordList: boolean;
  setReloadRecordList: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reloadRecordList: false, setReloadRecordList: useState });
