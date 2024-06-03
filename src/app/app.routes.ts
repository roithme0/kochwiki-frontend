import { Routes } from '@angular/router';

import { HomePageComponent } from './core/home-page/home-page.component';
import { FoodstuffsPageComponent } from './foodstuffs/foodstuffs-page/foodstuffs-page.component';
import { RecipesPageComponent } from './recipes/recipes-page/recipes-page.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Home' },
  {
    path: 'foodstuffs',
    component: FoodstuffsPageComponent,
    title: 'Lebensmittel',
  },
  {
    path: 'recipes',
    component: RecipesPageComponent,
    title: 'Rezepte',
  },
  {
    path: 'recipes/:id',
    component: RecipePageComponent,
    title: 'Rezept',
  },
];
