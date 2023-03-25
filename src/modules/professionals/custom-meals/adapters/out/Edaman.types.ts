export type AnalisysNutritionDataResponse = {
  calories: number;
  totalNutrients: {
    PROCNT: {
      label: string;
      quantity: number;
      unit: string;
    };
    CHOCDF: {
      label: string;
      quantity: number;
      unit: string;
    };
    FAT: {
      label: string;
      quantity: number;
      unit: string;
    };
  };
};
