import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { PageHeaderComponent } from './shared/page-header/page-header.component';

import { environment } from '../environments/environment';

console.log('active environment: ' + environment.name);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageHeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'default';
}
