import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../interfaces/recipe';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipes-grid-element',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './recipes-grid-element.component.html',
  styleUrl: './recipes-grid-element.component.scss',
})
export class RecipesGridElementComponent {
  recipe = input.required<Recipe>();
}
