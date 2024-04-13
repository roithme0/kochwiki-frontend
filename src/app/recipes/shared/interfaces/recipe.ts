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
  ingredients: Ingredient[];
  preptime: number | null;
  steps: Step[];
}
