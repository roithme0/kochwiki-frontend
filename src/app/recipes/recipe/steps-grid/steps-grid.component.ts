import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './steps-grid.component.html',
  styleUrl: './steps-grid.component.css',
})
export class StepsGridComponent {
  // render steps as grid
  @Input() recipe: Recipe | undefined;
}
