import { gql } from '@apollo/client';

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription commentAddedSubscription {
    commentAdded {
      _id
      comments {
        content
        commenter
        _id
      }
    }
  }
`;
