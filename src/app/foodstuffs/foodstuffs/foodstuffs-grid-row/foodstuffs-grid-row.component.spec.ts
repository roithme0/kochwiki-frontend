import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffsGridRowComponent } from './foodstuffs-grid-row.component';

describe('FoodstuffsGridRowComponent', () => {
  let component: FoodstuffsGridRowComponent;
  let fixture: ComponentFixture<FoodstuffsGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffsGridRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffsGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
