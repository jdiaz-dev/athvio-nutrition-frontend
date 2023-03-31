import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface ProgramBody {
  _id?: string;
  professional: string;
  name: string;
  description: string;
  programTags: {
    _id: string;
    title: string;
  };
  __typename?: string;
}

export type CreateProgramBody = Pick<ProgramBody, 'professional' | 'name' | 'description'>;
export interface CreateProgramRequest {
  input: CreateProgramBody;
}

export interface CreateProgramResponse {
  data: {
    createProgram: {
      _id: string;
      name: string;
      description: string;
    };
  };
}

export interface GetProgramsRequest {
  input: GetRecordsBody;
}

export interface CustomMeals {
  data: ProgramBody[];
  meta: MetadataRecords;
}
export interface GetProgramsResponse {
  getPrograms: CustomMeals;
}

export interface UpdateProgramBody extends Omit<ProgramBody, '_id'> {
  program: string;
}

export interface UpdateProgramRequest {
  input: UpdateProgramBody;
}

export interface UpdateProgramResponse {
  data: {
    updateProgram: {
      _id: string;
      name: string;
    };
  };
}

export interface DeleteProgramBody {
  professional: string;
  program: string;
}

export interface DeleteProgramRequest {
  input: DeleteProgramBody;
}

export interface DeleteProgamResponse {
  deleteCustomMeal: {
    _id: string;
    name: string;
  };
}
