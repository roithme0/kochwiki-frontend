import { Amount } from '../../../recipes/shared/interfaces/amount';

export interface Ingredient {
  [key: string]: any;
  id: number;
  name: string;
  brand: string | null;
  unit: string;
  unitVerbose: string;
  kcal: number | null;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
  amounts: Amount[];
}
