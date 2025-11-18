type ValueCase = {
  value: number;
  case?: string;
}

type Parameter = {
  spanishParameterName: string;
  valueCases: ValueCase[];
}

type Constant = {
  name: string;
  value: number;
}

type Coefficient = {
  variable: string;
  value: number;
}

type Case = {
  spanishCaseLabel: string;
  coefficients: Coefficient[];
  constants: Constant[];
}

type FormulaGroup = {
  spanishFormulaName: string;
  cases: Case[];
  parameters: Parameter[];
}

export type Formula = {
  spanishGroupName: string;
  formulaGroups: FormulaGroup[];
};

export type GetFormulaResponse = {
  getFormula: Formula;
};

export type FormulaInitialState = Formula;
