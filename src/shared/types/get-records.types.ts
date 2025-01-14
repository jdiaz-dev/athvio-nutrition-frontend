export interface GetRecordsBody {
  offset: number;
  limit: number;
  search?: string[];
}

export interface MetadataRecords {
  total: number;
  offset: number;
  limit: number;
}
