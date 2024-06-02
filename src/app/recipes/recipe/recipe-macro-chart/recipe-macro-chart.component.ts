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
      valueAbsolute: null,
      valuePercentage: null,
    },
    protein: {
      displayName: 'Protein',
      color: 'rgb(155, 255, 117)',
      valueAbsolute: null,
      valuePercentage: null,
    },
    fat: {
      displayName: 'Fett',
      color: 'rgb(255,97,97)',
      valueAbsolute: null,
      valuePercentage: null,
    },
  };

  ngOnChanges() {
    this.legend['carbs'].valueAbsolute = this.recipe.carbs;
    this.legend['protein'].valueAbsolute = this.recipe.protein;
    this.legend['fat'].valueAbsolute = this.recipe.fat;

    this.legend['carbs'].valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.carbs
    );
    this.legend['protein'].valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.protein
    );
    this.legend['fat'].valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.fat
    );

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

  private calculateValuePercentage(
    recipe: Recipe,
    macroValue: number | null | undefined
  ): number | null {
    if (
      recipe.carbs == null ||
      recipe.protein == null ||
      recipe.fat == null ||
      macroValue == null
    ) {
      return null;
    }

    const macroSum: number = recipe.carbs + recipe.protein + recipe.fat;
    return (macroValue / macroSum) * 100;
  }
}
