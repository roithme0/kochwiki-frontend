import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
// set header values
// render navigation
export class HomePageComponent {
  pageHeaderService = inject(PageHeaderService);

  // set header values
  ngOnInit() {
    this.pageHeaderService.headline = 'Home';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = false;
  }
}
