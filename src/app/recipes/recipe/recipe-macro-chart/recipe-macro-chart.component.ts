import {
  Component,
  ElementRef,
  Input,
  Signal,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { MatCardModule } from '@angular/material/card';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-recipe-macro-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-macro-chart.component.html',
  styleUrl: './recipe-macro-chart.component.css',
})
export class RecipeMacroChartComponent {
  title = 'ng-chart';
  chart: any = [];

  @Input() recipe!: Recipe;

  ngOnChanges() {
    if (this.recipe == undefined) {
      return;
    }
    console.log('ONCHANGE');

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      options: {
        cutout: '70%',
      },
      data: {
        datasets: [
          {
            data: [this.recipe.carbs, this.recipe.protein, this.recipe.fat],
            backgroundColor: [
              'rgb(19,154,155)',
              'rgb(155, 255, 117)',
              'rgb(255,97,97)',
            ],
            borderWidth: 0,
          },
        ],
      },
    });
  }
}
