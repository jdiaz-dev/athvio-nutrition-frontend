import type {
  CalculatedDose,
  ChildFormulaInput,
  ChildFormulaType,
  DosageDetail,
  DosageType,
  PreparationKey,
  Plant,
  ResultRow,
} from '../types/plant.types';
import { PREPARATIONS_META } from '../data/preparationsMeta';

const round = (value: number, decimals = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Pediatric dose factor (0-1) applied to the adult average dose.
 *  - Fried's Rule:  factor = edad en meses / 150
 *  - Young's Rule:  factor = edad en años / (edad en años + 12)
 *  - Clark's Rule:  factor = peso en kilos / 70
 */
export const getChildFactor = (formula: ChildFormulaType, value: number): number => {
  switch (formula) {
    case 'fried':
      return value / 150;
    case 'young':
      return value / (value + 12);
    case 'clark':
      return value / 70;
    default:
      return 0;
  }
};

const formulaLabel = (formula: ChildFormulaType): string => {
  switch (formula) {
    case 'fried':
      return 'Fried';
    case 'young':
      return 'Young';
    case 'clark':
      return 'Clark';
  }
};

/** Adult-average dose, unmodified — used as-is in the result table. */
const buildAdultoPromedioDose = (detail: DosageDetail): CalculatedDose => ({
  startRange: detail.startRange,
  endRange: detail.endRange,
  measurement: detail.measurement,
  frecuencyDay: detail.frecuencyDay,
});

/**
 * Adulto mayor dose: per product spec, show the MINIMUM of the adult
 * average range, purely for comparative purposes (not a new calculation).
 */
const buildAdultoMayorDose = (detail: DosageDetail): CalculatedDose | null => {
  if (detail.startRange === null) return null;
  return {
    startRange: detail.startRange,
    endRange: detail.startRange,
    measurement: detail.measurement,
    frecuencyDay: detail.frecuencyDay,
    note: 'Dosis mínima del adulto promedio (referencia comparativa)',
  };
};

/**
 * Child dose: applies the selected pediatric formula factor to the adult
 * average range, and (when the preparation uses a liquid vehicle) scales
 * the water/liquid amount by the same factor.
 */
const buildNinosDose = (
  detail: DosageDetail,
  prepKey: PreparationKey,
  childInput: ChildFormulaInput
): CalculatedDose | null => {
  if (detail.startRange === null || !childInput.formula || childInput.value === null) {
    return null;
  }

  const factor = Math.min(getChildFactor(childInput.formula, childInput.value), 1);
  const start = round(detail.startRange * factor);
  const end = detail.endRange !== null ? round(detail.endRange * factor) : null;

  const meta = PREPARATIONS_META.find((p) => p.key === prepKey);
  let waterNote: string | undefined;
  if (meta?.baseWaterMl) {
    const scaledMl = round(meta.baseWaterMl * factor, 0);
    waterNote = `${meta.waterLabel ?? 'agua'} ajustada a ~${scaledMl} ml`;
  }

  return {
    startRange: start,
    endRange: end,
    measurement: detail.measurement,
    frecuencyDay: detail.frecuencyDay,
    note: `Calculado con fórmula de ${formulaLabel(childInput.formula)} (factor ${round(factor, 3)})`,
    waterNote,
  };
};

export interface BuildResultRowsParams {
  plant: Plant;
  dosageType: DosageType;
  childInput: ChildFormulaInput;
}

/**
 * Builds the full set of result rows (one per preparation type) for the
 * currently selected plant and dosage type. This is the single function
 * the Result section relies on.
 */
export const buildResultRows = ({
  plant,
  dosageType,
  childInput,
}: BuildResultRowsParams): ResultRow[] => {
  return PREPARATIONS_META.map((meta) => {
    const detail = plant.dosisAdultoPromedio[meta.key];
    const adultoPromedio = buildAdultoPromedioDose(detail);
    const aplica = detail.startRange !== null;

    let secundaria: CalculatedDose | null = null;
    if (dosageType === 'adultoMayor') {
      secundaria = buildAdultoMayorDose(detail);
    } else if (dosageType === 'ninos') {
      secundaria = buildNinosDose(detail, meta.key, childInput);
    }

    return {
      key: meta.key,
      label: meta.label,
      adultoPromedio: aplica ? adultoPromedio : null,
      secundaria,
      aplica,
    };
  });
};

export const formatDose = (dose: CalculatedDose | null): string => {
  if (!dose || dose.startRange === null) return 'No aplica';
  const { startRange, endRange, measurement } = dose;
  const range =
    endRange !== null && endRange !== startRange
      ? `${startRange}-${endRange}`
      : `${startRange}`;
  return `${range} ${measurement}`;
};
