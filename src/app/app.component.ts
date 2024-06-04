import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SelectCustomUserPageComponent } from './core/select-custom-user-page/select-custom-user-page.component';

import { environment } from '../environments/environment';

import { ActiveCustomUserService } from './services/active-custom-user.service';

console.debug('active environment: ', environment.name);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PageHeaderComponent,
    SelectCustomUserPageComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  activeCustomUserService = inject(ActiveCustomUserService);
}
