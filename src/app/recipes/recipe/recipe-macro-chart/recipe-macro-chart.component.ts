import { Component, Input, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../interfaces/recipe';
import { LegendElement } from '../../../interfaces/legend-element';

import { MatCardModule } from '@angular/material/card';

import Chart from 'chart.js/auto';

import { ChartLegendElementComponent } from '../../../components/chart-legend-element/chart-legend-element';

@Component({
  selector: 'app-recipe-macro-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, ChartLegendElementComponent],
  templateUrl: './recipe-macro-chart.component.html',
  styleUrl: './recipe-macro-chart.component.css',
})
export class RecipeMacroChartComponent {
  @Input() recipe!: Recipe;

  chart: Signal<any> = computed(
    () =>
      new Chart('canvas', {
        type: 'doughnut',
        options: {
          cutout: '70%',
        },
        data: {
          datasets: [
            {
              data: [this.recipe.carbs, this.recipe.protein, this.recipe.fat],
              backgroundColor: [
                this.legend['carbs']().color,
                this.legend['protein']().color,
                this.legend['fat']().color,
              ],
              borderWidth: 0,
            },
          ],
        },
      })
  );

  legend: { [id: string]: Signal<LegendElement> } = {
    carbs: signal({
      displayName: 'Kohlenhydrate',
      color: 'rgb(19,154,155)',
      valueAbsolute: null,
      valuePercentage: null,
    }),
    protein: signal({
      displayName: 'Protein',
      color: 'rgb(155, 255, 117)',
      valueAbsolute: null,
      valuePercentage: null,
    }),
    fat: signal({
      displayName: 'Fett',
      color: 'rgb(255,97,97)',
      valueAbsolute: null,
      valuePercentage: null,
    }),
  };

  ngOnChanges() {
    this.legend['carbs']().valueAbsolute = this.recipe.carbs;
    this.legend['protein']().valueAbsolute = this.recipe.protein;
    this.legend['fat']().valueAbsolute = this.recipe.fat;

    this.legend['carbs']().valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.carbs
    );
    this.legend['protein']().valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.protein
    );
    this.legend['fat']().valuePercentage = this.calculateValuePercentage(
      this.recipe,
      this.recipe.fat
    );
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
