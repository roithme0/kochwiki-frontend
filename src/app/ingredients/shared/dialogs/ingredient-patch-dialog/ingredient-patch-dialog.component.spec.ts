import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPatchDialogComponent } from './ingredient-patch-dialog.component';

describe('IngredientPatchDialogComponent', () => {
  let component: IngredientPatchDialogComponent;
  let fixture: ComponentFixture<IngredientPatchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientPatchDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientPatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
