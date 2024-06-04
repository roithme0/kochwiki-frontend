import { Component, Signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartLegendElement } from '../../interfaces/chart-legend-element';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chart-legend-element',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './chart-legend-element.component.html',
  styleUrl: './chart-legend-element.component.css',
})
export class ChartLegendElementComponent {
  legendElement = input.required<ChartLegendElement>();

  displayedValueAbsolute: Signal<number | null> = computed(() => {
    const valueAbsolute: number | null | undefined =
      this.legendElement().valueAbsolute;
    if (!valueAbsolute) {
      return null;
    }
    return this.round(valueAbsolute, 1);
  });
  displayedValuePercentage: Signal<number | null> = computed(() => {
    const valuePercentage: number | null | undefined =
      this.legendElement().valuePercentage;
    if (!valuePercentage) {
      return null;
    }
    return Math.round(valuePercentage);
  });

  private round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }
}
