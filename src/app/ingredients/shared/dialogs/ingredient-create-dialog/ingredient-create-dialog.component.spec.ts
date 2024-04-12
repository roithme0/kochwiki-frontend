import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCreateDialogComponent } from './ingredient-create-dialog.component';

describe('IngredientCreateDialogComponent', () => {
  let component: IngredientCreateDialogComponent;
  let fixture: ComponentFixture<IngredientCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
