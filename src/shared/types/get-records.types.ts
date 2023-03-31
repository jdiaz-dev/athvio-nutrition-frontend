export interface GetRecordsBody {
  professional: string;
  offset: number;
  limit: number;
  search?: string[];
}

export interface MetadataRecords {
  total: number;
  offset: number;
  limit: number;
}
