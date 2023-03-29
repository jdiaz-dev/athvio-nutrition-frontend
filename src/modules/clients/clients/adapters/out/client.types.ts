import { Dayjs } from 'dayjs';
import { ManageClientGroupEnum } from 'src/shared/Consts';
import { ClientGroup } from 'src/shared/types';

export type UserInfoForClient = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AdditionalInfo = {
  location?: string;
  timezone?: string;
  height?: number | null;
  weight?: number | null;
  birthday?: Dayjs | null | string;
  gender?: string;
  profilePicture?: string;
  countryCode?: string;
  phone?: string;
};
export type ClientData = UserInfoForClient & AdditionalInfo;

export type BodyClient = {
  professional: string;
  userInfo: UserInfoForClient;
  additionalInfo: AdditionalInfo;
};
export interface CreateClientRequest {
  input: BodyClient;
}

export type ClientBodyResponse = {
  _id: string;
  userInfo: UserInfoForClient;
};

export type CreateClientResponse = {
  createClient: ClientBodyResponse;
};

export type GetClientsRequest = {
  input: {
    professional: string;
    offset: number;
    limit: number;
    state: string;
    search?: string[];
  };
};

export type Clients = {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  groups: ClientGroup[];
};

export type GetClientResponse = {
  getClients: {
    data: Clients[];
    meta: {
      total: number;
      limit: number;
      offset: number;
    };
  };
};

export type ManageClientGroupRequest = {
  input: {
    professional: string;
    client: string;
    clientGroup: string;
    action: ManageClientGroupEnum;
  };
};

export type ManageClientGroupResponse = {
  input: {
    _id: string;
    groups: {
      _id: string;
      groupName: string;
    }[];
  };
};
