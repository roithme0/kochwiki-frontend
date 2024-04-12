import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDeleteDialogComponent } from './ingredient-delete-dialog.component';

describe('IngredientDeleteDialogComponent', () => {
  let component: IngredientDeleteDialogComponent;
  let fixture: ComponentFixture<IngredientDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
