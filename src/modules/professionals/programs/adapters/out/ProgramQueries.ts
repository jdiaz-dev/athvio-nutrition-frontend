import { gql } from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation _createProgram($input: CreateProgramDto!) {
    createProgram(input: $input) {
      _id
      name
      description
      programTags {
        _id
      }
    }
  }
`;

export const GET_PROGRAMS = gql`
  query _getPrograms($input: GetProgramsDto!) {
    getPrograms(input: $input) {
      data {
        _id
        name
        description
        programTags {
          _id
          title
        }
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation _updateProgram($input: UpdateProgramDto!) {
    updateProgram(input: $input) {
      _id
      name
      programTags {
        _id
      }
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation _deleteProgram($input: DeleteProgramDto!) {
    deleteProgram(input: $input) {
      _id
      name
      programTags {
        _id
      }
    }
  }
`;
