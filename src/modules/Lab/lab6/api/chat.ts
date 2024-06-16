import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcherPost } from 'src/modules/Lab/utils/axios';

// types
import { ChatHistory } from 'src/modules/Lab/lab6/types/chat';

//todo: remove it
export const endpoints = {
  key: 'api/chat',
  list: '/users', // server URL
  update: '/filter', // server URL
};

export function useGetUserChat(userName: string) {
  const URL = [endpoints.key + endpoints.update, { user: userName, endpoints: 'chat' }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcherPost, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const memoizedValue = useMemo(
    () => ({
      chat: (data as ChatHistory[]) || [],
      chatLoading: isLoading,
      chatError: error,
      chatValidating: isValidating,
      chatEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export async function insertChat(userName: string, newChat: ChatHistory) {
  const URL = [endpoints.key + endpoints.update, { user: userName, endpoints: 'chat' }];

  // to update local state based on key
  mutate(
    URL,
    (currentChat: any) => {
      const addedChat: ChatHistory[] = [...currentChat, newChat];
      return addedChat;
    },
    false,
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  // const data = { chat: newChat };
  // await axios.post(endpoints.key + endpoints.update, data);
}
