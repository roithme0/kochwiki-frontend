import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendElement } from '../../../../shared/interfaces/legend-element';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-legend-element',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './legend-element.component.html',
  styleUrl: './legend-element.component.css',
})
export class LegendElementComponent {
  @Input() legendElement!: LegendElement;
}
