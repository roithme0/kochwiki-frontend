import { Component, Signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step } from '../../interfaces/step';
import { Recipe } from '../../interfaces/recipe';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './steps-grid.component.html',
  styleUrl: './steps-grid.component.scss',
})
// render steps as grid
export class StepsGridComponent {
  recipe = input.required<Recipe>();

  stepsSorted: Signal<Step[]> = computed(() =>
    this.recipe().steps.sort((a: Step, b: Step) => a.index - b.index)
  );
}
