import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'ingredients',
    component: IngredientsComponent,
    title: 'Zutaten',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    title: 'Rezepte',
  },
  {
    path: 'recipes/:id',
    component: RecipeComponent,
    title: 'Rezept',
  },
];
