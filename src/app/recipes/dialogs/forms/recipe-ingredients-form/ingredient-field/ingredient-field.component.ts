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
  @Input() foodstuffs!: Foodstuff[];
  @Input() index!: number;

  ingredientsFormGroupDirective = inject(FormGroupDirective);

  ingredientsFormGroup!: FormGroup;
  foodstuffIdControl!: FormControl;
  ingredientControl!: FormControl;

  panelTitle: WritableSignal<string> = signal('Lebensmittel wählen ...');

  // get form controls
  ngOnInit() {
    this.ingredientsFormGroup = this.ingredientsFormGroupDirective.control;
    this.foodstuffIdControl = this.ingredientsFormGroup.get(
      `ingredients.${this.index}.foodstuffId`
    ) as FormControl;
    this.ingredientControl = this.ingredientsFormGroup.get(
      `ingredients.${this.index}.amount`
    ) as FormControl;

    // set panel title if foodstuff is already selected
    const selectedFoodstuffId: number | null = this.foodstuffIdControl.value;
    this.updatePanelTitle(selectedFoodstuffId);
  }

  // call expansion panel title update on foodstuff selection change
  onSelectionChange(event: MatSelectChange) {
    this.updatePanelTitle(event.value);
  }

  // update expansion panel title
  updatePanelTitle(foodstuffId: number | null) {
    if (foodstuffId === null) {
      console.debug('No foodstuff id provided');
      this.panelTitle.set('Lebensmittel wählen ...');
      return;
    }

    const selectedFoodstuff: Foodstuff | undefined = this.foodstuffs.find(
      (foodstuff) => foodstuff.id == foodstuffId
    );
    if (selectedFoodstuff === undefined) {
      console.debug('Foodstuff not found');
      this.panelTitle.set('Fehler');
      return;
    }

    this.panelTitle.set(selectedFoodstuff.name);
  }
}
