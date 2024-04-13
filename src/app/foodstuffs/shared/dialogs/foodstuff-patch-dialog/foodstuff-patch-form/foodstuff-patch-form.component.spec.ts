import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffPatchFormComponent } from './foodstuff-patch-form.component';

describe('FoodstuffPatchFormComponent', () => {
  let component: FoodstuffPatchFormComponent;
  let fixture: ComponentFixture<FoodstuffPatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffPatchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffPatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
