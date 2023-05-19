import { Dayjs } from 'dayjs';
import { Meal } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ManageClientGroupEnum } from 'src/shared/Consts';
import { MetadataRecords } from 'src/shared/types/get-records.types';
import { ClientGroup } from 'src/shared/types/types';

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

export type ClientBody = {
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
    data: ClientBody[];
    meta: MetadataRecords;
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

export type ClientPlanDateExtendedProps = {
  client: string;
  clientPlan: string | null;
  meals: Pick<Meal, 'name'>[];
};
