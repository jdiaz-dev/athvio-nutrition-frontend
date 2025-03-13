export type CaloriesBody = {
  _id: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
};

export type CreateCaloriesInput = Omit<CaloriesBody, '_id'> & {
  patient: string;
};

export type CreateCaloriesRequest = {
  input: CreateCaloriesInput;
};

export type CreateCaloriesResponse = {
  createCalory: CaloriesBody;
};

export type GetCaloriesRequest = {
  input: { patient: string };
};

export type GetCaloriesResponse = {
  getCalory: CaloriesBody;
};

export type UpdateCaloriesInput = CreateCaloriesInput & {
  calory: string;
};

export type UpdateCaloriesRequest = {
  input: UpdateCaloriesInput;
};

export type UpdateCaloriesResponse = {
  updateCalory: CaloriesBody;
};
