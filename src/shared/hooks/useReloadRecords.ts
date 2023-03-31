import { useState } from 'react';

export const useReloadRecords = () => {
  const [reloadRecordList, setReloadRecordList] = useState(false);

  return { reloadRecordList, setReloadRecordList };
};
