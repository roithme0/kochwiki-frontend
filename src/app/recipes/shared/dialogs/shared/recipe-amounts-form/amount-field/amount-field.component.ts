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

import { Foodstuff } from '../../../../../../foodstuffs/shared/interfaces/foodstuff';

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
  @Input() foodstuffs!: Foodstuff[];
  @Input() index!: number;

  amountsFormGroupDirective = inject(FormGroupDirective);

  amountsFormGroup!: FormGroup;
  foodstuffIdControl!: FormControl;
  amountControl!: FormControl;

  panelTitle: WritableSignal<string> = signal('Lebensmittel wählen');

  ngOnInit() {
    // get form controls
    this.amountsFormGroup = this.amountsFormGroupDirective.control;
    this.foodstuffIdControl = this.amountsFormGroup.get(
      `amounts.${this.index}.foodstuffId`
    ) as FormControl;
    this.amountControl = this.amountsFormGroup.get(
      `amounts.${this.index}.amount`
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
      this.panelTitle.set('Lebensmittel wählen');
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
