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

import { LegendElementComponent } from './legend-element/legend-element.component';
import { LegendElement } from '../../../shared/interfaces/legend-element';

@Component({
  selector: 'app-recipe-macro-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, LegendElementComponent],
  templateUrl: './recipe-macro-chart.component.html',
  styleUrl: './recipe-macro-chart.component.css',
})
export class RecipeMacroChartComponent {
  title = 'ng-chart';
  chart: any = [];

  @Input() recipe!: Recipe;

  legend: { [id: string]: LegendElement } = {
    carbs: {
      displayName: 'Kohlenhydrate',
      color: 'rgb(19,154,155)',
      valueAbsolute: 0,
      valuePercentage: 0,
    },
    protein: {
      displayName: 'Protein',
      color: 'rgb(155, 255, 117)',
      valueAbsolute: 0,
      valuePercentage: 0,
    },
    fat: {
      displayName: 'Fett',
      color: 'rgb(255,97,97)',
      valueAbsolute: 0,
      valuePercentage: 0,
    },
  };

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
              this.legend['carbs'].color,
              this.legend['protein'].color,
              this.legend['fat'].color,
            ],
            borderWidth: 0,
          },
        ],
      },
    });
  }
}
