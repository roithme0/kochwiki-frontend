import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';
import { Step } from '../../shared/interfaces/step';

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

  ngOnInit() {
    this.stepsSorted = this.recipe.steps.sort((a, b) => a.index - b.index);
  }
}
