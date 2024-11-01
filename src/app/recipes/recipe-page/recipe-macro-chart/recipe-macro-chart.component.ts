import {
  Component,
  ElementRef,
  Signal,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../interfaces/recipe';
import { ChartLegendElement } from '../../../interfaces/chart-legend-element';

import { MatCardModule } from '@angular/material/card';

import Chart from 'chart.js/auto';

import { ChartLegendElementComponent } from '../../../components/chart-legend-element/chart-legend-element';

@Component({
  selector: 'app-recipe-macro-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, ChartLegendElementComponent],
  templateUrl: './recipe-macro-chart.component.html',
  styleUrl: './recipe-macro-chart.component.scss',
})
export class RecipeMacroChartComponent {
  recipe = input.required<Recipe>();

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  legend: { [id: string]: Signal<ChartLegendElement> } = {
    carbs: computed(() => {
      return {
        displayName: 'Kohlenhydrate',
        color: 'rgb(19,154,155)',
        valueAbsolute: this.recipe().carbs,
        valuePercentage: this.calculateValuePercentage(
          this.recipe(),
          this.recipe().carbs
        ),
      };
    }),
    protein: computed(() => {
      return {
        displayName: 'Protein',
        color: 'rgb(155, 255, 117)',
        valueAbsolute: this.recipe().protein,
        valuePercentage: this.calculateValuePercentage(
          this.recipe(),
          this.recipe().protein
        ),
      };
    }),
    fat: computed(() => {
      return {
        displayName: 'Fett',
        color: 'rgb(255,97,97)',
        valueAbsolute: this.recipe().fat,
        valuePercentage: this.calculateValuePercentage(
          this.recipe(),
          this.recipe().fat
        ),
      };
    }),
  };

  chart: any = null;

  constructor() {
    effect(() => {
      console.log('RERENDERING', this.recipe(), this.legend['carbs']());

      if (this.chart != null) {
        this.chart.destroy();
      }

      if (
        this.recipe().carbs == null ||
        this.recipe().protein == null ||
        this.recipe().fat == null
      ) {
        return;
      }

      if (this.canvas == undefined) {
        return;
      }

      this.createChart(this.canvas.nativeElement);
    });
  }

  private createChart(canvas: HTMLCanvasElement): void {
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      options: {
        cutout: '70%',
      },
      data: {
        datasets: [
          {
            data: [
              this.recipe().carbs,
              this.recipe().protein,
              this.recipe().fat,
            ],
            backgroundColor: [
              this.legend['carbs']().color,
              this.legend['protein']().color,
              this.legend['fat']().color,
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
