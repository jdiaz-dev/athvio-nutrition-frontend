type Mechanism = {
  uuid: string;
  englishName: string;
  spanishName: string;
  englishCategory: string;
  spanishCategory: string;
  englishDescription: string;
  spanishDescription: string;
  spanishRelatedDisease: string;
  englishRelatedDisease: string;
};

type Compound = {
  uuid: string;
  englishName: string;
  spanishName: string;
  mechanisms: Mechanism[];
};

export type FoodAnalyzer = {
  uuid: string;
  englishName: string;
  spanishName: string;
  compounds: Compound[];
};

export type GetAnalyzedFoodsBody = {
  internalFoods: string[];
};

export type GetAnalyzedFoodsRequest = {
  input: GetAnalyzedFoodsBody;
};

export type GetAnalyzedFoodsResponse = {
  getAnalyzedFoods: FoodAnalyzer[];
};

export type FoodAnalyzerInitialState = {
  foodAnalyzers: FoodAnalyzer[];
};
