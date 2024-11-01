import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { PageHeaderService } from '../../services/page-header.service';
import { ActiveCustomUserService } from '../../services/active-custom-user.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
// render page header
export class PageHeaderComponent {
  pageHeaderService = inject(PageHeaderService);
  activeCustomUserService = inject(ActiveCustomUserService);

  environmentName: string = environment.name;

  headline: Signal<string> = this.pageHeaderService.headline;
  back: Signal<string> = this.pageHeaderService.back;
  showBack: Signal<boolean> = this.pageHeaderService.showBack;
}
