import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.css',
})
export class DialogHeaderComponent {
  @Input() title!: string;
}
