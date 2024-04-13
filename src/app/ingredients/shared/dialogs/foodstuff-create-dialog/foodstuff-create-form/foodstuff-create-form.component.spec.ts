import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffCreateFormComponent } from './foodstuff-create-form.component';

describe('FoodstuffCreateFormComponent', () => {
  let component: FoodstuffCreateFormComponent;
  let fixture: ComponentFixture<FoodstuffCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffCreateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
