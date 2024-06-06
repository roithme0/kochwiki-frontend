import {
  Component,
  Signal,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActiveCustomUserService } from '../../../services/active-custom-user.service';
import { ShoppingListBackendService } from '../../../shopping-list/services/shopping-list-backend.service';

import { Ingredient } from '../../interfaces/ingredient';
import { CustomUser } from '../../../interfaces/custom-user';
import { ShoppingListItemIngredient } from '../../../shopping-list/interfaces/shopping-list-item-ingredient';
import { ShoppingList } from '../../../shopping-list/interfaces/shopping-list';

@Component({
  selector: 'app-ingredients-grid-shopping-list-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './ingredients-grid-shopping-list-button.component.html',
  styleUrl: './ingredients-grid-shopping-list-button.component.css',
})
export class IngredientsGridShoppingListButtonComponent {
  //#region inputs and outputs

  ingredient = input.required<Ingredient>();
  servings = input.required<number>();

  //#endregion

  //#region services

  activeCustomUserService = inject(ActiveCustomUserService);
  shoppingListBackendService = inject(ShoppingListBackendService);
  snackBarService = inject(MatSnackBar);

  //#endregion

  //#region fields

  activeCustomUser: Signal<CustomUser | null> =
    this.activeCustomUserService.activeCustomUser;

  isAddedToShoppingList: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  hasError: WritableSignal<boolean> = signal(false);

  //#endregion

  ngOnInit() {
    this.setIsAddedToShoppingList();
  }

  //#region methods

  OnAddToShoppingList() {
    this.hasError.set(false);
    this.isLoading.set(true);

    this.shoppingListBackendService
      .addIngredient(this.ingredient(), this.servings())
      .subscribe({
        next: (shoppingList: ShoppingList) => {
          console.info('Ingredient added to shopping list.');
          this.isAddedToShoppingList.set(true);
          this.isLoading.set(false);
          this.displaySnackBar(
            this.ingredient().name + ' wurde der Einkaufsliste hinzugefügt.'
          );
        },
        error: (error: any) => {
          console.error('Error adding ingredient to shopping list:', error);
          this.hasError.set(true);
          this.isLoading.set(false);
          this.displaySnackBar(
            'Fehler beim Hinzufügen von ' +
              this.ingredient().name +
              ' zur Einkaufsliste.'
          );
        },
      });
  }

  OnRemoveFromShoppingList() {
    this.hasError.set(false);
    this.isLoading.set(true);

    this.shoppingListBackendService
      .removeIngredient(this.ingredient())
      .subscribe({
        next: (shoppingList: ShoppingList) => {
          console.info('Ingredient removed from shopping list.');
          this.isAddedToShoppingList.set(false);
          this.isLoading.set(false);
          this.displaySnackBar(
            this.ingredient().name + ' wurde von der Einkaufsliste entfernt.'
          );
        },
        error: (error: any) => {
          console.error('Error removing ingredient from shopping list:', error);
          this.hasError.set(true);
          this.isLoading.set(false);
          this.displaySnackBar(
            'Fehler beim Entfernen von ' +
              this.ingredient().name +
              ' von der Einkaufsliste.'
          );
        },
      });
  }

  //#endregion

  //#region utilities

  setIsAddedToShoppingList(): void {
    const activeCustomUser: CustomUser | null = this.activeCustomUser();

    // should never be null
    if (activeCustomUser === null) {
      return;
    }

    var shoppingListItemIngredient: ShoppingListItemIngredient | undefined;
    this.ingredient().shoppingListItemIngredients.forEach((item) => {
      item.shoppingLists.forEach((shoppingList) => {
        if (shoppingList.customUserId === activeCustomUser.id) {
          shoppingListItemIngredient = item;
        }
      });
    });

    if (shoppingListItemIngredient === undefined) {
      this.isAddedToShoppingList.set(false);
      return;
    }
    this.isAddedToShoppingList.set(true);
  }

  displaySnackBar(text: string) {
    this.snackBarService.open(text, '', {
      duration: 5000,
    });
  }

  //#endregion
}
