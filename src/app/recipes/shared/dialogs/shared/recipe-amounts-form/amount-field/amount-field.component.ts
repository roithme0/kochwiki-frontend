import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { Ingredient } from '../../../../../../ingredients/shared/interfaces/ingredient';

@Component({
  selector: 'app-amount-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  templateUrl: './amount-field.component.html',
  styleUrl: './amount-field.component.css',
})
export class AmountFieldComponent {
  @Input() ingredients!: Ingredient[];
  @Input() index!: number;

  amountsFormGroupDirective = inject(FormGroupDirective);

  amountsFormGroup!: FormGroup;
  ingredientIdControl!: FormControl;
  amountControl!: FormControl;

  panelTitle: WritableSignal<string> = signal('Zutat wählen');

  ngOnInit() {
    // get form controls
    this.amountsFormGroup = this.amountsFormGroupDirective.control;
    this.ingredientIdControl = this.amountsFormGroup.get(
      `amounts.${this.index}.ingredientId`
    ) as FormControl;
    this.amountControl = this.amountsFormGroup.get(
      `amounts.${this.index}.amount`
    ) as FormControl;

    // set panel title if ingredient is already selected
    const selectedIngredientId: number | null = this.ingredientIdControl.value;
    this.updatePanelTitle(selectedIngredientId);
  }

  // call expansion panel title update on ingredient selection change
  onSelectionChange(event: MatSelectChange) {
    this.updatePanelTitle(event.value);
  }

  // update expansion panel title
  updatePanelTitle(ingredientId: number | null) {
    if (ingredientId === null) {
      console.debug('No ingredient id provided');
      this.panelTitle.set('Zutat wählen');
      return;
    }

    const selectedIngredient: Ingredient | undefined = this.ingredients.find(
      (ingredient) => ingredient.id == ingredientId
    );
    if (selectedIngredient === undefined) {
      console.debug('Ingredient not found');
      this.panelTitle.set('Fehler');
      return;
    }

    this.panelTitle.set(selectedIngredient.name);
  }
}
