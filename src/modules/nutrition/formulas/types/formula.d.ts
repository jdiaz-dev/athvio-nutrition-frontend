export type ValueCase = {
  value: number;
  case?: string;
  spanishCase?: string;
};

export type Parameter = {
  spanishParameterName: string;
  description: string;
  valueCases: ValueCase[];
};

type Constant = {
  name: string;
  value: number;
};

type Coefficient = {
  variable: string;
  value: number;
};

type Case = {
  spanishCaseLabel: string;
  case: string;
  coefficients: Coefficient[];
  constants: Constant[];
};

export type FormulaGroup = {
  spanishFormulaName: string;
  cases: Case[];
  parameterDescription?: string;
  parameters: Parameter[];
};

export type Formula = {
  spanishGroupName: string;
  formulaGroups: FormulaGroup[];
};

export type GetFormulaResponse = {
  getFormula: Formula;
};

export type FormulaInitialState = {
  formula: Formula;
};

export type CalculateBodyMassIndexInput = {
  age: number;
  height: number;
  weight: number;
  gender: string;
  isPregnant?: boolean;
};

export type CalculateBodyMassIndexRequest = {
  input: CalculateBodyMassIndexInput;
};

export type BodyMassIndexResult = {
  bodyMassIndex: number;
  classification: string;
  source: string;
  rangeLabel: string;
  zScore: number | null;
  weightGainMinKg: number | null;
  weightGainMaxKg: number | null;
};

export type CalculateBodyMassIndexResponse = {
  calculateBodyMassIndex: BodyMassIndexResult;
};
