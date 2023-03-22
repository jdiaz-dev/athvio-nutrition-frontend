import { ClientGroup } from 'src/shared/types';

type ClientGroupBody = {
  professionalId: string;
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
    professionalId: string;
    clientGroupId: string;
    groupName: string;
  };
};

export type GetClientGroupsResponse = {
  getClientGroups: ClientGroup[];
};

export type GetClientGroupsRequest = {
  input: {
    professionalId: string;
  };
};

export type DeleteClientGroupsRequest = {
  input: {
    professionalId: string;
    clientGroupId: string;
  };
};

export type DeleteClientGroupsResponse = {
  getClientGroups: ClientGroup[];
};
