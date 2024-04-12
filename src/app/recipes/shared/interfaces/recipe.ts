import { Amount } from './amount';
import { Step } from './step';

export interface Recipe {
  id: number;
  name: string;
  // image: File | null;
  originName: string | null;
  originUrl: string | null;
  // original: File | null;
  servings: number;
  amounts: Amount[];
  preptime: number | null;
  steps: Step[];
}
