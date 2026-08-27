import type { ChildFormulaOption } from '../types/plant.types';

/**
 * Classic pediatric dosage formulas used to scale an average adult herbal
 * dose down to a child's dose. These are standard pharmacology rules of
 * thumb (not specific to any single plant) taught widely in nursing and
 * pharmacy curricula in Latin America.
 */
export const CHILD_FORMULAS: ChildFormulaOption[] = [
  {
    id: 'fried',
    nombre: 'Fórmula de Fried',
    paraQuien: 'Bebés y lactantes',
    datoLabel: 'Edad',
    datoUnidad: 'meses',
    placeholder: 'Edad en meses',
  },
  {
    id: 'young',
    nombre: 'Fórmula de Young',
    paraQuien: 'Niños de 2 a 12 años',
    datoLabel: 'Edad',
    datoUnidad: 'años',
    placeholder: 'Edad en años',
  },
  {
    id: 'clark',
    nombre: 'Fórmula de Clark',
    paraQuien: 'Cualquier niño',
    datoLabel: 'Peso',
    datoUnidad: 'kilos',
    placeholder: 'Peso en kilos',
  },
];
