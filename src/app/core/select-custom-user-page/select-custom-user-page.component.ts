import { Component, WritableSignal, inject, signal } from '@angular/core';

import { PageHeaderService } from '../../services/page-header.service';
import { CustomUserBackendService } from '../../services/custom-user-backend.service';
import { ActiveCustomUserService } from '../../services/active-custom-user.service';
import { SnackBarService } from '../../services/snack-bar.service';

import { UserCreateDialogComponent } from '../dialogs/user-create-dialog/user-create-dialog.component';

import { CustomUser } from '../../interfaces/custom-user';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select-custom-user-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './select-custom-user-page.component.html',
  styleUrl: './select-custom-user-page.component.css',
})
export class SelectCustomUserPageComponent {
  pageHeaderService = inject(PageHeaderService);
  customUserBackendService = inject(CustomUserBackendService);
  activeCustomUserService = inject(ActiveCustomUserService);
  snackBarService = inject(SnackBarService);
  dialog = inject(MatDialog);

  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  customUsers: CustomUser[] = [];

  constructor() {
    this.customUserBackendService.customUsers$.subscribe(() => {
      this.fetchCustomUsers();
    });
  }

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
        this.snackBarService.open('Benutzer konnten nicht geladen werden');
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  openUserCreateDialog(): void {
    this.dialog.open(UserCreateDialogComponent, {
      data: {},
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus: false,
      disableClose: true,
    });
  }
}
