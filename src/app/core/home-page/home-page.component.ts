import { Component, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
// set header values
// render navigation
export class HomePageComponent {
  pageHeaderService = inject(PageHeaderService);

  environmentName: Signal<string> = signal(environment.name);

  // set header values
  ngOnInit() {
    this.pageHeaderService.headline = 'Home';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = false;
  }
}
