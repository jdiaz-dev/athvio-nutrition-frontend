export type GetFoodRequest = {
  input: {
    offset: number;
    limit: number;
    search?: string[];
  };
};

export type Food = {
  _id: string;
  name: string;
};

export type GetFoodsResponse = {
  getFoods: {
    data: Food[];
    meta: {
      total: number;
      limit: number;
      offset: number;
    };
  };
};
