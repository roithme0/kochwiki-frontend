import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPatchFormComponent } from './ingredient-patch-form.component';

describe('IngredientPatchFormComponent', () => {
  let component: IngredientPatchFormComponent;
  let fixture: ComponentFixture<IngredientPatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientPatchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientPatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
