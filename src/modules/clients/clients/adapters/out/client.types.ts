import { Dayjs } from 'dayjs';

export type UserInfoForClient = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AdditionalInfo = {
  location?: string;
  timezone?: string;
  height?: string;
  weight?: string;
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
};

export type CreateClientResponse = {
  createClient: ClientBodyResponse;
};
