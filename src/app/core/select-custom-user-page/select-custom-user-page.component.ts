import { Component, WritableSignal, inject, signal } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';
import { CustomUserBackendService } from '../../services/custom-user-backend.service';
import { ActiveCustomUserService } from '../../services/active-custom-user.service';

import { CustomUser } from '../../interfaces/custom-user';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-select-custom-user-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './select-custom-user-page.component.html',
  styleUrl: './select-custom-user-page.component.css',
})
export class SelectCustomUserPageComponent {
  pageHeaderService = inject(PageHeaderService);
  customUserBackendService = inject(CustomUserBackendService);
  activeCustomUserService = inject(ActiveCustomUserService);

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  customUsers: CustomUser[] = [];

  ngOnInit() {
    this.pageHeaderService.headline = 'Home';
    this.pageHeaderService.back = '';
    this.pageHeaderService.showBack = false;

    this.fetchCustomUsers();
  }

  fetchCustomUsers() {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.customUserBackendService.getAllCustomUsers().subscribe({
      next: (customUsers) => {
        this.customUsers = customUsers;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('failed to fetch customUsers: ', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
