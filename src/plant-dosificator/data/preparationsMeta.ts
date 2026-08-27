import type { PreparationMeta } from '../types/plant.types';

/**
 * Display order and metadata for every preparation type shown in the
 * result table. `baseWaterMl` is the approximate liquid volume used in the
 * standard adult recipe (per dose), used to scale the liquid amount down
 * for a child's dose. Preparations without a liquid vehicle (polvo,
 * cápsula, jarabe, exudados/resinas) do not carry a base volume.
 */
export const PREPARATIONS_META: PreparationMeta[] = [
  { key: 'infusion', label: 'Infusión', baseWaterMl: 250, waterLabel: 'agua (1 taza)' },
  { key: 'decoccion', label: 'Decocción', baseWaterMl: 500, waterLabel: 'agua (1/2 litro)' },
  { key: 'tintura', label: 'Tintura', baseWaterMl: 100, waterLabel: 'agua para diluir (medio vaso)' },
  { key: 'exudadosResinas', label: 'Exudados / Resinas' },
  { key: 'polvo', label: 'Polvo' },
  { key: 'capsula', label: 'Cápsula' },
  { key: 'jarabe', label: 'Jarabe' },
];
