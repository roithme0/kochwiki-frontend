import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { PageHeaderService } from '../services/page-header.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  // render page header
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  headline: Signal<string> = this.pageHeaderService.headline;
  back: Signal<string> = this.pageHeaderService.back;
  showBack: Signal<boolean> = this.pageHeaderService.showBack;
}
