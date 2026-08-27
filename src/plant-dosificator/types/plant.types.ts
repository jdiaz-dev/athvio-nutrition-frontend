// Core domain types for the medicinal plant dosage calculator

export type PreparationKey =
  | 'infusion'
  | 'decoccion'
  | 'tintura'
  | 'exudadosResinas'
  | 'polvo'
  | 'capsula'
  | 'jarabe';

export interface DosageDetail {
  startRange: number | null;
  endRange: number | null;
  measurement: string;
  frecuencyDay: string;
  fullDetail: string;
}

export type DosageAdultoPromedio = Record<PreparationKey, DosageDetail>;

export interface Plant {
  s: string; // scientific name
  fam: string; // botanical family
  com: string; // common name
  otr?: string; // other regional names
  par: string; // part used
  usu: string; // traditional use
  pre?: string; // precautions / warnings
  sis: string[]; // body systems
  dosisAdultoPromedio: DosageAdultoPromedio;
  recomendedSchedules: string[]; // e.g. ['8am', '1pm']
}

export type DosageType = 'adultoPromedio' | 'ninos' | 'adultoMayor';

export type ChildFormulaType = 'fried' | 'young' | 'clark';

export interface ChildFormulaOption {
  id: ChildFormulaType;
  nombre: string;
  paraQuien: string;
  datoLabel: string;
  datoUnidad: string;
  placeholder: string;
}

export interface ChildFormulaInput {
  formula: ChildFormulaType | null;
  value: number | null;
}

export interface PreparationMeta {
  key: PreparationKey;
  label: string;
  /** Approximate base water/liquid volume (ml) used for the standard adult
   * preparation, when applicable. Used to scale liquid quantities for
   * children. Undefined when the preparation is not water/liquid based. */
  baseWaterMl?: number;
  waterLabel?: string;
}

export interface CalculatedDose {
  startRange: number | null;
  endRange: number | null;
  measurement: string;
  frecuencyDay: string;
  note?: string;
  waterNote?: string;
}

export interface ResultRow {
  key: PreparationKey;
  label: string;
  adultoPromedio: CalculatedDose | null;
  secundaria: CalculatedDose | null; // adulto mayor OR niños, depending on selection
  aplica: boolean;
}
