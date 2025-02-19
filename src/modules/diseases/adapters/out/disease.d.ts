import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';
import { PlanDayInfo } from 'src/shared/types/types';

export interface DiseaseBody {
  _id: string;
  name: string;
}

export interface Diseases {
  data: DiseaseBody[];
  meta: MetadataRecords;
}
export interface GetDiseasesResponse {
  getDiseases: Diseases;
}

export interface DiseaseInitialState {
  diseases: Diseases | null;
}
