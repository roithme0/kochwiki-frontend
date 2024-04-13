import { Ingredient } from '../../../recipes/shared/interfaces/ingredient';

export interface Foodstuff {
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
  ingredients: Ingredient[];
}
