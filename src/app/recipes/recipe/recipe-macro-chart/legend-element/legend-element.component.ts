import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendElement } from '../../../../shared/interfaces/legend-element';

@Component({
  selector: 'app-legend-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend-element.component.html',
  styleUrl: './legend-element.component.css',
})
export class LegendElementComponent {
  @Input() legendElement!: LegendElement;
}
