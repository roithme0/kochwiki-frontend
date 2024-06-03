import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step } from '../../interfaces/step';
import { Recipe } from '../../interfaces/recipe';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './steps-grid.component.html',
  styleUrl: './steps-grid.component.css',
})
// render steps as grid
export class StepsGridComponent {
  @Input() recipe!: Recipe;

  stepsSorted: Step[] = [];

  ngOnChanges() {
    this.stepsSorted = this.recipe.steps.sort(
      (a: Step, b: Step) => a.index - b.index
    );
  }
}
