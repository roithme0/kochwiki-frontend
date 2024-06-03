import { Component, Input } from '@angular/core';
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
  @Input() legendElement!: ChartLegendElement;
}
