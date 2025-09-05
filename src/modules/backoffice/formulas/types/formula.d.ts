type Constant = {
  spanishConstantName: string;
  value: number;
  case?: string;
};

type FormulaGroup = {
  spanishFormulaName: string;
  constants: Constant[];
};

export type Formula = {
  spanishGroupName: string;
  formulaGroups: FormulaGroup[];
};

export type GetFormulaResponse = {
  getFormula: Formula;
};

export type FormulaInitialState = Formula;
