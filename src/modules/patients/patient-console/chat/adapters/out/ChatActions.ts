import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  CommendAddedSubscriptionInput,
  CommendAddedSubscriptionRequest,
  CommentAddedResponse,
  SaveChatInput,
  SaveChatRequest,
  SaveChatResponse,
} from 'src/modules/patients/patient-console/chat/adapters/out/chat.d';
import { PATIENT_MESSAGED_SUBSCRIPTION, SAVE_CHAT_COMMENT } from 'src/modules/patients/patient-console/chat/adapters/out/ChatQueries';
import * as ChatSlice from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatSlice';

export function useChat() {
  const dispatch = useDispatch();

  const saveChatComment = async (body: SaveChatInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<SaveChatResponse, SaveChatRequest>({
        mutation: SAVE_CHAT_COMMENT,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(ChatSlice.newCommentReceived(response.data.saveChatComment.comments[0]));
    } catch (error) {
      dispatch(ChatSlice.addChatCommentFailure((error as ApolloError).graphQLErrors[0].message));
    }
  };

  const commentAddedSubscription = async (body: CommendAddedSubscriptionInput): Promise<void> => {
    try {
      const response = apolloClient
        .subscribe<CommentAddedResponse, CommendAddedSubscriptionRequest>({
          query: PATIENT_MESSAGED_SUBSCRIPTION,
          variables: {
            input: body,
          },
        })
        .subscribe(({ data, errors, extensions }) => {
          if (data) dispatch(ChatSlice.newCommentReceived(data.patientMessaged.comments[0]));
        });

      if (response) {
        console.log('-------response', response);
        // dispatch(PatientPlanSlice.acceptNewPatientPlan(response.?.updatePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { saveChatComment, commentAddedSubscription };
}
