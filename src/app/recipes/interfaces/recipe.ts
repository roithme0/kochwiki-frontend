import { Ingredient } from './ingredient';
import { Step } from './step';

export interface Recipe {
  id: number;
  name: string;
  // image: File | null;
  originName: string | null;
  originUrl: string | null;
  // original: File | null;
  servings: number;
  kcal?: number | null;
  carbs?: number | null;
  protein?: number | null;
  fat?: number | null;
  ingredients: Ingredient[];
  preptime: number | null;
  steps: Step[];
}
