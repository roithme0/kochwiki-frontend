import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  input,
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
import { MatSelectModule } from '@angular/material/select';

import { Foodstuff } from '../../../../../foodstuffs/interfaces/foodstuff';

@Component({
  selector: 'app-ingredient-field',
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
  templateUrl: './ingredient-field.component.html',
  styleUrl: './ingredient-field.component.css',
})
export class IngredientFieldComponent {
  foodstuffs = input.required<Foodstuff[]>();
  index = input.required<number>();

  ingredientsFormGroupDirective = inject(FormGroupDirective);

  ingredientsFormGroup!: FormGroup;
  foodstuffIdControl!: FormControl;
  ingredientControl!: FormControl;

  selectedFoodstuffId: WritableSignal<number | undefined> = signal(undefined);
  selectedFoodstuff: Signal<Foodstuff | undefined> = computed(() => {
    const selectedFoodstuffId: number | undefined = this.selectedFoodstuffId();
    return this.foodstuffs().find(
      (foodstuff) => foodstuff.id === selectedFoodstuffId
    );
  });
  panelTitle: Signal<string> = computed(() => {
    const selectedFoodstuff: Foodstuff | undefined = this.selectedFoodstuff();
    if (selectedFoodstuff === undefined) {
      return 'Lebensmittel wählen ...';
    }
    return selectedFoodstuff.name;
  });

  // get form controls
  ngOnInit() {
    this.ingredientsFormGroup = this.ingredientsFormGroupDirective.control;
    this.foodstuffIdControl = this.ingredientsFormGroup.get(
      `ingredients.${this.index()}.foodstuffId`
    ) as FormControl;
    this.ingredientControl = this.ingredientsFormGroup.get(
      `ingredients.${this.index()}.amount`
    ) as FormControl;
  }
}
