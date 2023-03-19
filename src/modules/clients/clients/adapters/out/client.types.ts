import { Dayjs } from 'dayjs';

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
  professionalId: string;
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
    professionalId: string;
    offset: number;
    limit: number;
    state: string;
  };
};

export type GetClientResponse = {
  getClients: {
    _id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};
