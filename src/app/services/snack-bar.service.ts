import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBarService = inject(MatSnackBar);

  open(text: string) {
    this.snackBarService.open(text, '', {
      duration: 2000,
    });
  }
}
