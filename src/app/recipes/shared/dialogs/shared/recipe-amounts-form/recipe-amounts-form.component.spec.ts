import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAmountsFormComponent } from './recipe-amounts-form.component';

describe('RecipeAmountsFormComponent', () => {
  let component: RecipeAmountsFormComponent;
  let fixture: ComponentFixture<RecipeAmountsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeAmountsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeAmountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
