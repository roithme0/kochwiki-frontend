import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomUserBackendService } from '../../../../services/custom-user-backend.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CustomUser } from '../../../../interfaces/custom-user';

@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-create-form.component.html',
  styleUrl: './user-create-form.component.css',
})
export class UserCreateFormComponent {
  success = output<void>();

  customUserBackendService = inject(CustomUserBackendService);
  fb = inject(FormBuilder);

  customUserForm = this.fb.group({
    username: ['', Validators.required],
  });

  onSubmit(): void {
    console.debug(
      'submitting create customUser form: ',
      this.customUserForm.value
    );
    const customUser: Partial<CustomUser> = this.customUserForm
      .value as CustomUser;

    this.customUserBackendService.postCustomUser(customUser).subscribe({
      next: (customUser: CustomUser) => {
        console.info('customUser created: ', customUser);
        this.customUserBackendService.notifyCustomUsersChanged();
        this.success.emit();
      },
      error: (error: any) => {
        console.error('failed to create customUser: ', error);
      },
    });
  }
}
