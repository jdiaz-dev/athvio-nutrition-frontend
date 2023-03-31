import { useState } from 'react';

export const useSearcher = () => {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [matchedRecords, setMatchedRecords] = useState<string[]>([]);
  const [choosedWord, setChoosedWord] = useState(false);
  const [recentlyTypedWord, setRecentlyTypedWord] = useState(false);

  return {
    searchWords,
    setSearchWords,
    matchedRecords,
    setMatchedRecords,
    choosedWord,
    setChoosedWord,
    recentlyTypedWord,
    setRecentlyTypedWord,
  };
};
