import { ClientGroup } from 'src/shared/types';

type ClientGroupBody = {
  professional: string;
  groupName: string;
};

export type CreateClientGroupRequest = {
  input: ClientGroupBody;
};

export type CreateClientGroupResponse = {
  createClientGroup: ClientGroup;
};

export type UpdateClientGroupsResponse = {
  updateClientGroup: ClientGroup;
};

export type UpdateClientGroupsRequest = {
  input: {
    professional: string;
    clientGroup: string;
    groupName: string;
  };
};

export type GetClientGroupsResponse = {
  getClientGroups: ClientGroup[];
};

export type GetClientGroupsRequest = {
  input: {
    professional: string;
  };
};

export type DeleteClientGroupsRequest = {
  input: {
    professional: string;
    clientGroup: string;
  };
};

export type DeleteClientGroupsResponse = {
  getClientGroups: ClientGroup[];
};
